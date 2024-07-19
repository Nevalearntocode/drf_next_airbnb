from rest_framework import serializers
from reservation.models import Reservation
from property.serializers import PropertySerializerWithLandlord
from users.serializers import CustomUserSerializer


class ReservationSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="reservation-detail")
    guest = CustomUserSerializer(read_only=True)
    class Meta:
        model = Reservation
        fields = "__all__"


class ReservationDetailSerializer(serializers.ModelSerializer):
    property = PropertySerializerWithLandlord(read_only=True)
    guest = CustomUserSerializer(read_only=True)

    class Meta:
        model = Reservation
        fields = "__all__"
