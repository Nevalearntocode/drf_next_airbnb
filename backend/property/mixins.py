from rest_framework.viewsets import GenericViewSet

class PropertyQuerysetMixin(GenericViewSet):
    def get_queryset(self):
        request = self.request
        queryset = super().get_queryset()
        id = request.query_params.get("id")
        name = request.query_params.get("name")
        category = request.query_params.get("category")
        if id:
            queryset = queryset.filter(id=id)
        if name:
            queryset = queryset.filter(name__icontains=name)
        if category:
            queryset = queryset.filter(category=category)
        return queryset
