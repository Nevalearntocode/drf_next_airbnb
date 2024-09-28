from django.urls import path
from chat import consumers

websocket_urlpatterns = [
    path("ws/conversations/<str:conversations>/", consumers.ChatConsumer.as_asgi()),
]
