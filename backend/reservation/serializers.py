from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from reservation.models import Reservation
from property.serializers import PropertySerializer
from users.serializers import CustomUserSerializer


class BaseReservationSerializer(serializers.ModelSerializer):
    guest = CustomUserSerializer(read_only=True)
    total = serializers.ReadOnlyField()
    nights = serializers.ReadOnlyField()

    class Meta:
        model = Reservation
        fields = "__all__"

    def validate(self, attrs):
        request = self.context.get("request")
        property_instance = attrs["property"]

        if request and request.user == property_instance.landlord:
            raise ValidationError("You can't book a reservation on your own property.")

        check_in = attrs["check_in"]
        check_out = attrs["check_out"]

        if check_in >= check_out:
            raise ValidationError("Check-in date must be before check-out.")

        guests = int(request.data.get("guests"))

        if guests > property_instance.guests:
            raise ValidationError(
                "The number of guests is greater than the property's capacity please contact the property's landlord for arrangement."
            )

        overlapsing_reservations = (
            Reservation.objects.filter(
                property=property_instance,
                check_out__gte=check_in,
                check_in__lte=check_out,
            )
            .exclude(id=self.instance.id if self.instance else None)
            .exists()
        )

        if overlapsing_reservations:
            raise ValidationError(
                "There is already a reservation with choosen dates, please contact the property's landlord"
            )

        return super().validate(attrs)

    def get_nights(self, validated_data):
        check_in = validated_data["check_in"]
        check_out = validated_data["check_out"]
        return (check_out - check_in).days

    def calculate_total(self, validated_data):
        property_instance = validated_data["property"]
        price = property_instance.price
        fee_percentage = property_instance.fee_percentage

        nights = self.get_nights(validated_data)

        total_price_pre_fee = price * nights
        fee = total_price_pre_fee * fee_percentage / 100

        total = total_price_pre_fee + fee

        return total

    def create(self, validated_data):
        request = self.context.get("request")
        guest = request.user
        nights = self.get_nights(validated_data)
        total = self.calculate_total(validated_data)
        reservation = Reservation.objects.create(
            guest=guest, total=total, nights=nights, **validated_data
        )
        return reservation

    def update(self, instance, validated_data):
        nights = self.get_nights(validated_data)
        total = self.calculate_total(validated_data)
        for key, value in validated_data.items():
            # for every key and value in the validated data dictionary
            # run instance.key = value
            setattr(instance, key, value)
        instance.nights = nights
        instance.total = total
        instance.save()

        return instance


class ReservationSerializer(BaseReservationSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="reservation-detail")


class ReservationDetailSerializer(BaseReservationSerializer):
    property = PropertySerializer(read_only=True)
