from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin

from favorite.serializers import FavoriteSerializer
from favorite.models import Favorite


class FavoriteViewSet(GenericViewSet, CreateModelMixin):
    serializer_class = FavoriteSerializer
    queryset = Favorite.objects.all()

    def _is_favorite_exists(self, user, property):
        return self.get_queryset().filter(user=user, property=property).exists()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        favorite_already_exists = self._is_favorite_exists(
            request.user, request.data["property"]
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        message = "Favorite"
        status_code = status.HTTP_201_CREATED

        if favorite_already_exists:
            message = "Unfavorited"
            status_code = status.HTTP_204_NO_CONTENT

        return Response(
            {"message": message, **serializer.data}, status=status_code, headers=headers
        )
