from datetime import datetime
from django.db import models
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from reservation.models import Reservation
from reservation.serializers import ReservationSerializer, ReservationDetailSerializer
from reservation.permissions import IsOwnerOrIsHost


class ReservationViewSet(ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsOwnerOrIsHost]

    def get_queryset(self):
        request = self.request
        queryset = self.queryset.filter(
            models.Q(guest=request.user) | models.Q(property__landlord=request.user)
        )
        return queryset

    @action(detail=False, methods=["GET"])
    def me(self, request):
        if request.method == "GET":
            queryset = self.get_queryset().filter(guest=request.user)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = ReservationDetailSerializer
        return super().retrieve(request, *args, **kwargs)

    def is_data_unchanged(self, request):
        instance = self.get_object()
        check_in = datetime.strptime(request.data.get("check_in"), "%Y-%m-%d").date()
        check_out = datetime.strptime(request.data.get("check_out"), "%Y-%m-%d").date()
        guests = int(request.data.get("guests"))
        return (
            check_in == instance.check_in
            and check_out == instance.check_out
            and guests == instance.guests
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        no_changes = self.is_data_unchanged(request)
        if no_changes:
            return Response(
                status=status.HTTP_204_NO_CONTENT,
                data={"message": "No changes were made"},
            )

        data = request.data.copy()
        data["property"] = instance.property.id
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if getattr(instance, "_prefetched_objects_cache", None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
