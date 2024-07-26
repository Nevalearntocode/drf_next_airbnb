import boto3
from botocore.config import Config
from django.conf import settings
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from property.models import Property
from property.mixins import PropertyQuerysetMixin
from property.permissions import IsOwnerOrReadOnly
from property.paginations import PropertyPagination
from property.serializers import PropertySerializer, PropertySerializerWithLandlord


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

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        image_url = instance.image  # Assuming the Property model has an image_url field

        # Extract the file key from the URL
        file_key = image_url.split("/")[-1]

        # Delete the image from Cloudflare R2
        r2_response = self.delete_from_r2(file_key)

        if r2_response:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(
                {"detail": "Failed to delete image from R2"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def delete_from_r2(self, file_key):
        s3_client = boto3.client(
            "s3",
            endpoint_url=settings.CLOUDFLARE_R2_ENDPOINT,
            aws_access_key_id=settings.CLOUDFLARE_R2_ACCESS_KEY_ID,
            aws_secret_access_key=settings.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
            config=Config(signature_version="s3v4"),
        )

        try:
            response = s3_client.delete_object(
                Bucket=settings.CLOUDFLARE_R2_BUCKET_NAME, Key=file_key
            )
            return response["ResponseMetadata"]["HTTPStatusCode"] == 204
        except Exception as e:
            print(f"Error deleting file from R2: {e}")
            return False
