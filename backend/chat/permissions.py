from rest_framework.permissions import BasePermission


class IsChatMember(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.initiator:
            return True
        if request.user == obj.receptitor:
            return True
        return False
