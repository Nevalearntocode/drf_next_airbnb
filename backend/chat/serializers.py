from rest_framework import serializers
from chat.models import Message, Conversation

# Features:
# User only has access to the conversations they are part of
# User can only edit and delete their message
# User need to be authenticated to access the chat

# A response to a list request of conversation should return:
# a list of conversations, each with:
# - id, list of user associated with the conversation (name and avatar)
# - last message

# A response to a retrieve request of conversation should return:
# - list of messages in the conversation, each with: sender, receiver, content, updated_at
# - users in the conversation

# First message from a sender to receiver will create a conversation, if users try to create another conversation with the same users, they will get the existing conversation instead (group feature will be added later)

# If user using API to send message before the conversation exists, create a new conversation


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
