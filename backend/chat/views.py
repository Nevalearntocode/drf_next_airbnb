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
from chat.paginations import MessagePagination
from chat.mixins import MessageQuerysetMixin


class MessageViewSet(ModelViewSet, MessageQuerysetMixin):
    queryset = Message.objects.order_by("-created_at").all()
    serializer_class = MessageBaseSerializer
    permission_classes = [IsSender]
    pagination_class = MessagePagination

    def list(self, request, *args, **kwargs):
        self.serializer_class = MessageListSerializer
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = MessageDetailSerializer
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        data = request.data.copy()
        receiver = self.get_receiver(request)
        data["receiver"] = receiver
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_destroy(self, instance):
        instance.deleted = True
        instance.content = ""
        instance.save()

    def get_receiver(self, request):
        instance = self.get_object()
        if request.user != instance.conversation.receptitor:
            receiver = instance.conversation.receptitor.id
        else:
            receiver = instance.conversation.initiator.id

        return receiver


class ConversationViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
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

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = ConversationDetailSerializer
        return super().retrieve(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        context = {"request": request}
        serializer = ConversationListSerializer(queryset, many=True, context=context)
        return Response(serializer.data)
