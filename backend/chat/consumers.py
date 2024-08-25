import json

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from chat.models import Conversation, Message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        # Join room
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        conversation_id = data["data"]["conversation_id"]
        content = data["data"]["content"]

        message = {"type": "chat_message", "content": content}  # Add this line

        await self.channel_layer.group_send(self.room_group_name, message)

        await self.save_message(conversation_id, content)

    # await sync_to_async(Message.objects.create)(
    #     conversation=Conversation.objects.get(id=conversation_id),
    #     sender=self.scope["user"],
    #     body=content,
    # )

    # return await super().receive(text_data, bytes_data)

    async def chat_message(self, event):
        content = event["content"]

        await self.send(
            text_data=json.dumps(
                {
                    "content": content,
                }
            )
        )

    async def send_message(self, event):
        content = event["content"]
        await self.send(text_data=json.dumps({"content": content}))

    @sync_to_async
    def save_message(self, conversation_id, content):
        
        Message.objects.create(
            conversation=Conversation.objects.get(id=conversation_id),
            sender=self.scope["user"],
            content=content,
        )
