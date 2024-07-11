from rest_framework import serializers
from property.models import Property


class ListCreatePropertySerializer(serializers.ModelSerializer):
    landlord = serializers.PrimaryKeyRelatedField(
        read_only=True, source="landlord.email"
    )

    class Meta:
        model = Property
        fields = [
            "id",
            "name",
            "price",
            "description",
            "category",
            "landlord",
            "created_at",
            "image",
            "guests",
            "beds",
            "baths",
            "address",
            "country",
            "country_code",
        ]
