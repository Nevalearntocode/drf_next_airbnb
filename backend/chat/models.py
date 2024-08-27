import uuid
from django.db import models


class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    initiator = models.ForeignKey(
        "users.CustomUser", on_delete=models.CASCADE, related_name="sent_conversations"
    )
    receptitor = models.ForeignKey(
        "users.CustomUser",
        on_delete=models.CASCADE,
        related_name="received_conversations",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.initiator} - {self.receptitor}"


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        "chat.Conversation", on_delete=models.CASCADE, related_name="messages"
    )
    sender = models.ForeignKey(
        "users.CustomUser", on_delete=models.CASCADE, related_name="sent_messages"
    )
    content = models.TextField()
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.conversation.initiator} - {self.conversation.receptitor}"