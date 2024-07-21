from rest_framework.permissions import BasePermission


class IsOwnerOrIsHost(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.guest:
            return True
        if obj.property and request.user == obj.property.landlord:
            return True
        return False
