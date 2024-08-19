from rest_framework.permissions import BasePermission


class IsChatMember(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.initiator:
            return True
        if request.user == obj.receptitor:
            return True
        return False


class IsSender(BasePermission):
    def has_object_permission(self, request, view, obj):
        is_member = (
            request.user == obj.conversation.initiator
            or request.user == obj.conversation.receptitor
        )
        if request.method in ["GET", "HEAD", "OPTIONS"] and is_member:
            return True
        elif request.user == obj.sender:
            return True
        return False
