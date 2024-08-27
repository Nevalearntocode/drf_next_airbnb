from rest_framework import serializers
from chat.models import Message, Conversation
from django.db.models import Q
from users.models import CustomUser
from users.serializers import CustomUserForConversationsSerializer


class MessageBaseSerializer(serializers.ModelSerializer):
    sender = serializers.ReadOnlyField(source="sender.id")
    conversation = serializers.ReadOnlyField(source="conversation.id")
    deleted = serializers.ReadOnlyField()
    receiver = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Message
        fields = "__all__"

    def validate(self, data):
        request = self.context.get("request")
        sender = request.user
        receiver = data["receiver"]
        conversation = Conversation.objects.filter(
            (Q(initiator=sender) & Q(receptitor=receiver))
            | (Q(initiator=receiver) & Q(receptitor=sender))
        )

        data["conversation"] = conversation.first()

        if not conversation.exists():
            conversation = Conversation.objects.create(
                initiator=sender, receptitor=receiver
            )
            data["conversation"] = conversation

        data["sender"] = sender

        data.pop("receiver")

        return data


class MessageListSerializer(MessageBaseSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="message-detail")

    class Meta:
        model = Message
        fields = "__all__"


class MessageDetailSerializer(MessageBaseSerializer):
    receiver = serializers.ReadOnlyField()

    class Meta:
        model = Message
        fields = "__all__"


class LastMessageSerializer(MessageBaseSerializer):
    class Meta:
        model = Message
        fields = ["sender", "content", "created_at"]


class ConversationBaseSerializer(serializers.ModelSerializer):
    initiator = CustomUserForConversationsSerializer(read_only=True)

    class Meta:
        model = Conversation
        fields = "__all__"

    def create(self, validated_data):
        request = self.context.get("request")
        initiator = request.user
        receptitor = validated_data["receptitor"]
        validated_data["initiator"] = initiator

        conversation = Conversation.objects.filter(
            Q(initiator=initiator, receptitor=receptitor)
            | Q(initiator=receptitor, receptitor=initiator)
        )

        if conversation.exists():
            return conversation.first()
        return super().create(validated_data)


class ConversationDetailSerializer(ConversationBaseSerializer):
    receptitor = CustomUserForConversationsSerializer()


class ConversationListSerializer(ConversationBaseSerializer):
    receptitor = CustomUserForConversationsSerializer()
    last = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(view_name="conversation-detail")

    def get_last(self, obj):
        last = obj.messages.order_by("-created_at").first()
        if last:
            return LastMessageSerializer(last).data
        return None
