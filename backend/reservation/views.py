from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from reservation.models import Reservation
from reservation.serializers import ReservationSerializer, ReservationDetailSerializer
from reservation.permissions import IsOwnerOrIsHost
from property.models import Property


class ReservationViewSet(ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsOwnerOrIsHost]

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

    def perform_create(self, serializer):
        # This line is retrieving the id of the property that the user is trying to
        # create a reservation for from the validated data of the serializer.
        # property_id = serializer.validated_data["property"].id
        # property_instance = Property.objects.get(id=property_id)
        # if property_instance.landlord == self.request.user:
        #     raise ValidationError(
        #         "You cannot create a reservation for your own property."
        #     )
        serializer.save(guest=self.request.user)
