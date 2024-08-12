from rest_framework import serializers
from favorite.models import Favorite


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["property"]

    def get_user_and_property(self, attrs):
        user = self.context.get("request").user
        property = attrs.get("property")
        return user, property

    def validate(self, attrs):
        user, property = self.get_user_and_property(attrs)

        if user == property.landlord:
            raise serializers.ValidationError("You can't favorite your own property.")

        return super().validate(attrs)

    def create(self, validated_data):
        user, property = self.get_user_and_property(validated_data)
        favorite, created = Favorite.objects.get_or_create(user=user, property=property)

        if not created:
            favorite.delete()

        return favorite
