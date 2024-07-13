from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from property.serializers import PropertySerializer, PropertySerializerWithLandlord
from property.permissions import IsOwnerOrReadOnly
from property.models import Property


class PropertyPagination(PageNumberPagination):
    page_size = 8
    page_query_param = "page"


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


class PropertyViewset(ModelViewSet, PropertyQuerysetMixin):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    pagination_class = PropertyPagination
    permission_classes = [IsOwnerOrReadOnly]

    @action(detail=False, methods=["GET", "POST"])
    def me(self, request):
        if request.method == "GET":
            queryset = self.get_queryset().filter(landlord=request.user)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        elif request.method == "POST":
            return super().create(request)

    def retrieve(self, request, *args, **kwargs):
        self.permission_classes = [IsOwnerOrReadOnly]
        self.serializer_class = PropertySerializerWithLandlord
        instance = self.get_object()
        context = {"request": request}
        serializer = self.get_serializer(instance, context=context)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super().create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer = serializer.save(landlord=self.request.user)
        return super().perform_create(serializer)
