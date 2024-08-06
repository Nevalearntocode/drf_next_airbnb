from rest_framework import serializers
from property.models import Property
from users.serializers import CustomUserSerializer
from backend.mixins import R2Mixin
from reservation.models import Reservation


class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ["id", "check_in", "check_out"]


class BasePropertySerializer(serializers.ModelSerializer, R2Mixin):
    fee_percentage = serializers.ReadOnlyField()
    landlord = CustomUserSerializer(read_only=True)
    image = serializers.URLField(required=False)
    image_file = serializers.FileField(required=False, allow_null=True, write_only=True)

    class Meta:
        model = Property
        fields = "__all__"

    def validate(self, attrs):
        request = self.context.get("request")
        image = request.data.get("image")
        if image is None:
            image = request.FILES.get("image_file")
        attrs.pop("image_file", None)
        attrs["image"] = image
        return attrs

    def create(self, validated_data):
        image = validated_data["image"]
        if type(image) != str:
            request = self.context.get("request")
            user_id = str(request.user.id)
            unique_key = self.generate_unique_key(image.name, user_id)
            self.upload_to_r2(image, unique_key)
            image = self.create_image_url(unique_key)
        validated_data["image"] = image
        return super().create(validated_data)


class PropertySerializer(BasePropertySerializer):
    url = serializers.HyperlinkedIdentityField(view_name="property-detail")


class PropertySerializerWithLandlord(BasePropertySerializer):
    reservations = ReservationSerializer(many=True, read_only=True)
