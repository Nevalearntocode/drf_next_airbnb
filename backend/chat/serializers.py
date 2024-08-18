from rest_framework import serializers
from chat.models import Message, Conversation
from django.db.models import Q
from users.models import CustomUser

# Features:
# User only has access to the conversations they are part of
# User can only edit and delete their message
# User need to be authenticated to access the chat

# A response to a list request of conversation should return:
# a list of conversations, each with:
# - id, list of user associated with the conversation (name and avatar)
# - last message

# A response to a retrieve request of conversation should return:
# - list of messages in the conversation, each with: sender, receptitor, content, updated_at
# - users in the conversation

# First message from a sender to receptitor will create a conversation, if users try to create another conversation with the same users, they will get the existing conversation instead (group feature will be added later)

# If user using API to send message before the conversation exists, create a new conversation


class BaseMessageSerializer(serializers.ModelSerializer):
    sender = serializers.ReadOnlyField(source="sender.name")
    conversation = serializers.ReadOnlyField(source="conversation.id")

    class Meta:
        model = Message
        fields = "__all__"


class CreateMessageSerializer(BaseMessageSerializer):
    receiver = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Message
        fields = "__all__"


class MessageDetailSerializer(BaseMessageSerializer):
    receiver = serializers.ReadOnlyField()

    class Meta:
        model = Message
        fields = "__all__"


class ConversationMessagesSerializer(BaseMessageSerializer):
    class Meta:
        model = Message
        exclude = ["conversation"]


class BaseConversationSerializer(serializers.ModelSerializer):
    initiator = serializers.ReadOnlyField(source="initiator.name")

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


class ConversationSerializer(BaseConversationSerializer):
    receptitor = serializers.ReadOnlyField(source="receptitor.name")
    url = serializers.HyperlinkedIdentityField(view_name="conversation-detail")


class ConversationWithMessagesSerializer(BaseConversationSerializer):
    receptitor = serializers.ReadOnlyField(source="receptitor.name")
    messages = ConversationMessagesSerializer(many=True)
