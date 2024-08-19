from rest_framework.viewsets import ModelViewSet
from chat.serializers import (
    MessageBaseSerializer,
    MessageListSerializer,
    MessageDetailSerializer,
    ConversationBaseSerializer,
    ConversationListSerializer,
    ConversationDetailSerializer,
)
from chat.models import Message, Conversation
from chat.permissions import IsChatMember, IsSender
from django.db.models import Q
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import status


class MessageViewSet(ModelViewSet):
    serializer_class = MessageBaseSerializer
    queryset = Message.objects.all()
    permission_classes = [IsSender]

    def list(self, request, *args, **kwargs):
        self.serializer_class = MessageListSerializer
        return super().list(request, *args, **kwargs)
    
    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = MessageDetailSerializer
        return super().retrieve(request, *args, **kwargs)


class ConversationViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    serializer_class = ConversationBaseSerializer
    queryset = Conversation.objects.all()
    permission_classes = [IsChatMember]

    def get_queryset(self):
        request = self.request
        queryset = self.queryset.filter(
            Q(initiator=request.user) | Q(receptitor=request.user)
        )
        return queryset

    def get_object(self):
        return super().get_object()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        context = {"request": request}
        serializer = ConversationListSerializer(queryset, many=True, context=context)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = ConversationDetailSerializer
        return super().retrieve(request, *args, **kwargs)
