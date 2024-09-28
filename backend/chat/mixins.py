from rest_framework.viewsets import GenericViewSet
from django.db.models import Count


class MessageQuerysetMixin(GenericViewSet):
    def get_queryset(self):
        request = self.request
        queryset = super().get_queryset()
        conversation_id = request.query_params.get("conversation")

        if conversation_id:
            queryset = queryset.filter(conversation=conversation_id)

        queryset = queryset.order_by("created_at")

        return queryset
