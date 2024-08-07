from backend.serializers import ImageSerializerMixin, FileFieldWithoutValidation
from rest_framework import serializers
from property.models import Property
from users.serializers import CustomUserSerializer
from reservation.models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ["id", "check_in", "check_out"]


class BasePropertySerializer(serializers.ModelSerializer, ImageSerializerMixin):
    fee_percentage = serializers.ReadOnlyField()
    landlord = CustomUserSerializer(read_only=True)
    image = serializers.CharField(required=False, allow_blank=True)
    image_file = FileFieldWithoutValidation(
        required=False, allow_null=True, write_only=True
    )

    class Meta:
        model = Property
        fields = "__all__"

    def validate(self, attrs):
        return self.validate_and_process_image(attrs, "image")

    def update(self, instance, validated_data):
        current_image = instance.image
        request_image = self.upload_image(validated_data["image"])
        self.delete_image(current_image, request_image)
        validated_data["image"] = request_image
        return super().update(instance, validated_data)

    def delete(self, instance):
        image_url = instance.image
        self.delete_image(image_url)
        instance.delete()
        return instance


class PropertySerializer(BasePropertySerializer):
    url = serializers.HyperlinkedIdentityField(view_name="property-detail")


class PropertySerializerWithLandlord(BasePropertySerializer):
    reservations = ReservationSerializer(many=True, read_only=True)
