import uuid
from django.db import models

class Favorite(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        "users.CustomUser", on_delete=models.CASCADE, related_name="favorites_user"
    )
    property = models.ForeignKey(
        "property.Property", on_delete=models.CASCADE, related_name="favorites_property"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "property")
        
    def __str__(self):
        return f"{self.user.name} - {self.property.name}"