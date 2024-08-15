from rest_framework.viewsets import ModelViewSet
from chat.serializers import MessageSerializer, ConversationSerializer
from chat.models import Message, Conversation


class MessageViewSet(ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()


class ConversationViewSet(ModelViewSet):
    serializer_class = ConversationSerializer
    queryset = Conversation.objects.all()
