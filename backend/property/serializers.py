from rest_framework import serializers
from property.models import Property
from users.serializers import CustomUserSerializer


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ["id", "name", "image", "price", "address"]


class PropertySerializerWithLandlord(serializers.ModelSerializer):
    landlord = CustomUserSerializer(read_only=True)

    class Meta:
        model = Property
        fields = "__all__"
