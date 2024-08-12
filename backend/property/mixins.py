from rest_framework.viewsets import GenericViewSet
from django.db.models import Count


class PropertyQuerysetMixin(GenericViewSet):
    def get_queryset(self):
        request = self.request
        queryset = super().get_queryset()
        id = request.query_params.get("id")
        name = request.query_params.get("name")
        category = request.query_params.get("category")
        by_favorites = request.query_params.get("by_favorites")

        if id:
            queryset = queryset.filter(id=id)
        if name:
            queryset = queryset.filter(name__icontains=name)
        if category:
            queryset = queryset.filter(category=category)
        if by_favorites:
            queryset = queryset.annotate(favorite=Count("favorites")).order_by(
                "-favorite"
            )

        queryset = queryset.annotate(favorite=Count("favorites")).order_by("-favorite")
        return queryset
