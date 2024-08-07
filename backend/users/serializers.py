from djoser.serializers import UserSerializer
from backend.serializers import ImageSerializerMixin, FileFieldWithoutValidation
from rest_framework import serializers


class CustomUserSerializer(UserSerializer, ImageSerializerMixin):
    avatar = serializers.CharField(required=False, allow_blank=True)
    avatar_file = FileFieldWithoutValidation(
        required=False, allow_null=True, write_only=True
    )

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ("avatar", "avatar_file")


    def validate(self, attrs):
        return self.validate_and_process_image(attrs, "avatar")
    
    def update(self, instance, validated_data):
        current_image = instance.avatar
        request_image = self.upload_image(validated_data["avatar"])
        self.delete_image(current_image, request_image)
        validated_data["avatar"] = request_image
        return super().update(instance, validated_data)