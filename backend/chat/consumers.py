from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from django.contrib.auth import get_user_model
from chat.models import Message
from django.utils import timezone

User = get_user_model()


class ChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.conversation_id = None
        self.room_name = None

    def connect(self):
        self.accept()
        self.user = self.scope["user"]
        print(self.user)
        if not self.user.is_authenticated:
            self.close()
        self.conversation_id = self.scope["url_route"]["kwargs"]["conversations"]
        self.room_name = f"conversation_{self.conversation_id}"
        async_to_sync(self.channel_layer.group_add)(self.room_name, self.channel_name)

    def receive_json(self, content):
        message_type = content["type"]
        message_handlers = {
            "send": self.create_message,
            "edit": self.edit_message,
            "delete": self.delete_message,
        }
        message_handler = message_handlers.get(message_type)
        if message_handler:
            message_handler(content)

    def create_message(self, content):
        message = Message.objects.create(
            sender=self.user,
            conversation_id=self.conversation_id,
            content=content["message"],
        )
        self._group_send(
            "send",
            {
                "id": str(message.id),
                "sender": message.sender.name,
                "content": message.content,
                "created_at": message.created_at.isoformat(),
                "updated_at": (
                    message.updated_at.isoformat() if message.updated_at else None
                ),
                "deleted": message.deleted,
                "conversation": str(message.conversation.id),
            },
        )

    def edit_message(self, content):
        message_id = content["message"]["id"]
        message = Message.objects.get(id=message_id)
        message.content = content["message"]["content"]
        message.updated_at = timezone.now()
        message.save()
        self._group_send(
            "edit",
            {
                "id": str(message.id),
                "sender": message.sender.name,
                "content": message.content,
                "created_at": message.created_at.isoformat(),
                "updated_at": message.updated_at.isoformat(),
                "deleted": message.deleted,
                "conversation": str(message.conversation.id),
            },
        )

    def delete_message(self, content):
        message_id = content["message"]
        message = Message.objects.get(id=message_id)
        message.content = ""
        message.updated_at = timezone.now()
        message.deleted = True
        message.save()
        self._group_send(
            "delete",
            {
                "id": str(message.id),
                "sender": message.sender.name,
                "content": message.content,
                "created_at": message.created_at.isoformat(),
                "updated_at": message.updated_at.isoformat(),
                "deleted": message.deleted,
                "conversation": str(message.conversation.id),
            },
        )

    def _get_access_token(self):
        for name, value in self.scope["headers"]:
            if name == b"cookie":
                for cookie in value.decode().split("; "):
                    if cookie.startswith("access="):
                        return cookie.split("=")[1]
        return None

    def _group_send(self, message_type, message_data):
        async_to_sync(self.channel_layer.group_send)(
            self.room_name,
            {"type": message_type, "new_message": message_data},
        )

    def send(self, event):
        self.send_json(event)

    def edit(self, event):
        self.send_json(event)

    def delete(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_name, self.channel_name
        )
