import uuid
from django.db import models
from property.models import Property
from users.models import CustomUser
from django.utils import timezone


STATUS_CHOICES = (
    ("reserved", "Reserved"),
    ("ongoing", "Ongoing"),
    ("ended", "Ended"),
)


class Reservation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="reservations",
    )
    guest = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="guest_reservations"
    )
    guests = models.IntegerField()
    total = models.IntegerField()
    nights = models.IntegerField()
    check_in = models.DateField()
    check_out = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="reserved")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.guest.name} - {self.property.name} - {self.check_in} - {self.check_out}"

    def update_status(self):
        now = timezone.now().date()

        if self.check_in <= now <= self.check_out:
            self.status = "ongoing"
        elif now > self.check_out:
            self.status = "ended"
            total_price_without_fee = self.nights * self.property.price
            Property.objects.filter(id=self.property.id).update(
                revenue=models.F("revenue") + total_price_without_fee
            )
        else:
            self.status = "reserved"

        self.save()
