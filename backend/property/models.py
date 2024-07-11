import uuid
from django.db import models
from django.conf import settings
from users.models import CustomUser


class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    country_code = models.CharField(max_length=10)
    price = models.IntegerField()
    guests = models.IntegerField()
    beds = models.IntegerField()
    baths = models.IntegerField()
    image = models.ImageField(upload_to="upload/properties")
    landlord = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="landlord"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def image_url(self):
        return f"{settings.WEBSITE_URL}{self.image.url}"