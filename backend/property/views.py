from rest_framework.generics import ListCreateAPIView
from .models import Property
from .serializers import ListCreatePropertySerializer
from rest_framework.permissions import AllowAny


class ListCreatePropertyView(ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = ListCreatePropertySerializer

    def perform_create(self, serializer):
        serializer = serializer.save(landlord=self.request.user)
        return super().perform_create(serializer)

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return super().get_permissions()
