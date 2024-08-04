from django.db import models
from users.models import CustomUser
import uuid

CATEGORIES = {
    "beach": "Beach",
    "windmills": "Windmills",
    "modern": "Modern",
    "countryside": "Countryside",
    "pools": "Pools",
    "islands": "Islands",
    "lake": "Lake",
    "skiing": "Skiing",
    "castles": "Castles",
    "caves": "Caves",
    "camping": "Camping",
    "arctic": "Arctic",
    "desert": "Desert",
    "barns": "Barns",
    "lux": "Lux",
}


class Property(models.Model):
    class Meta:
        verbose_name_plural = "Properties"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=255, choices=CATEGORIES)
    address = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    country_code = models.CharField(max_length=10)
    price = models.IntegerField()
    guests = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    image = models.URLField(max_length=2000)
    landlord = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="landlord"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    fee_percentage = models.FloatField(default=5)
    revenue = models.IntegerField(default=0, editable=False)

    def __str__(self):
        return self.name
