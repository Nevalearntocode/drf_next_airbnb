import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.middleware import BaseMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()

from chat import routing

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": BaseMiddleware(URLRouter(routing.websocket_urlpatterns)),
    }
)
