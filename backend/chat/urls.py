from rest_framework.routers import DefaultRouter
from chat.views import MessageViewSet, ConversationViewSet

router = DefaultRouter()
router.register("messages", MessageViewSet, basename="message")
router.register("conversations", ConversationViewSet, basename="conversation")

urlpatterns = router.urls
