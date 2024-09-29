from rest_framework.viewsets import GenericViewSet
from django.db.models import Count


class PropertyQuerysetMixin(GenericViewSet):
    def get_queryset(self):
        request = self.request
        queryset = super().get_queryset()
        id = request.query_params.get("id")
        name = request.query_params.get("name")
        category = request.query_params.get("category")
        country = request.query_params.get("location")
        check_in = request.query_params.get("check-in")
        check_out = request.query_params.get("check-out")
        guests = request.query_params.get("guests")
        by_favorites = request.query_params.get("by_favorites")
        landlord = request.query_params.get("landlord")

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
        if check_in:
            queryset = queryset.filter(check_in__gte=check_in)
        if check_out:
            queryset = queryset.filter(check_out__lte=check_out)
        if guests:
            queryset = queryset.filter(guests__gte=guests)
        if country:
            queryset = queryset.filter(country__icontains=country)
        if landlord:
            queryset = queryset.filter(landlord=landlord)

        queryset = queryset.annotate(favorite=Count("favorites")).order_by("-favorite")
        return queryset
