import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

django_application = get_asgi_application()

from chat import routing
from chat.middleware import JWTMiddleware

application = ProtocolTypeRouter(
    {
        "http": django_application,
        "websocket": JWTMiddleware(URLRouter(routing.websocket_urlpatterns)),
    }
)
