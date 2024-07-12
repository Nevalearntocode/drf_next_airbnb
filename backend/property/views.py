from rest_framework.generics import ListCreateAPIView
from .models import Property
from rest_framework.exceptions import NotAuthenticated
from .serializers import ListCreatePropertySerializer
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination


class PropertyPagination(PageNumberPagination):
    page_size = 8
    page_query_param = "page"


class ListCreatePropertyView(ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = ListCreatePropertySerializer
    pagination_class = PropertyPagination

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        querySet = self.queryset
        id = self.request.query_params.get("id")
        name = self.request.query_params.get("name")
        if self.request.method == "GET" and "me" in self.request.path:
            user = self.request.user
            if not user.is_authenticated:
                raise NotAuthenticated
            return querySet.filter(landlord=user)
        if id:
            return querySet.filter(id=id)
        if name:
            querySet = querySet.filter(name__icontains=name)
        return querySet

    def perform_create(self, serializer):
        serializer = serializer.save(landlord=self.request.user)
        return super().perform_create(serializer)

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return super().get_permissions()
