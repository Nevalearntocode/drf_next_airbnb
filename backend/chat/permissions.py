from rest_framework.permissions import IsAuthenticated


class IsChatParticipant(IsAuthenticated):
    def is_chat_member(self, request, view, obj):
        return obj.initiator == request.user or obj.receptitor == request.user

    def is_sender(self, request, view, obj):
        return request.user == obj.sender


class IsChatMember(IsChatParticipant):
    def has_object_permission(self, request, view, obj):
        return self.is_chat_member(request, view, obj)


class IsSender(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.sender
