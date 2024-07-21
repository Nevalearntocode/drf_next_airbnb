import uuid
from django.db import models
from property.models import Property
from users.models import CustomUser


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
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.guest.name} - {self.property.name} - {self.check_in} - {self.check_out}"
