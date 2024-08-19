from rest_framework.permissions import IsAuthenticated


class IsOwnerOrIsHost(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.guest:
            return True
        if obj.property and request.user == obj.property.landlord:
            return True
        return False
