from rest_framework import serializers
from property.models import Property
from users.serializers import CustomUserSerializer

class PropertySerializer(serializers.HyperlinkedModelSerializer):
    landlord = serializers.PrimaryKeyRelatedField(
        read_only=True, source="landlord.email"
    )

    class Meta:
        model = Property
        fields = "__all__"


class PropertySerializerWithLandlord(serializers.HyperlinkedModelSerializer):
    landlord = CustomUserSerializer(read_only=True)

    class Meta:
        model = Property
        fields = "__all__"