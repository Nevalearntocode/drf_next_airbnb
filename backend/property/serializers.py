from rest_framework import serializers
from property.models import Property
from users.serializers import CustomUserSerializer
from reservation.models import Reservation


class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ["id", "check_in", "check_out"]


class BasePropertySerializer(serializers.ModelSerializer):
    fee_percentage = serializers.ReadOnlyField()
    class Meta:
        model = Property
        fields = "__all__"


class PropertySerializer(BasePropertySerializer):
    landlord = serializers.PrimaryKeyRelatedField(
        read_only=True, source="landlord.email"
    )
    url = serializers.HyperlinkedIdentityField(view_name="property-detail")


class PropertySerializerWithLandlord(BasePropertySerializer):
    landlord = CustomUserSerializer(read_only=True)
    reservations = ReservationSerializer(many=True, read_only=True)
