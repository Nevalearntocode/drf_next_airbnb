import uuid
from django.db import models


class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    users = models.ManyToManyField("users.CustomUser", related_name="conversations")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        users = list(self.users.values_list("name", flat=True)[:3])
        joined_users = " - ".join(users)
        return joined_users


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        "chat.Conversation", on_delete=models.CASCADE, related_name="messages"
    )
    sender = models.ForeignKey(
        "users.CustomUser", on_delete=models.CASCADE, related_name="sent_messages"
    )
    receiver = models.ForeignKey(
        "users.CustomUser", on_delete=models.CASCADE, related_name="received_messages"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
