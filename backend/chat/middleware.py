import jwt
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken


@database_sync_to_async
def get_user(scope):
    token = scope["token"]
    model = get_user_model()

    try:
        if token:
            token_key = AccessToken(token)
            user_id = token_key.payload["user_id"]
            return model.objects.get(pk=user_id)
        else:
            return AnonymousUser()
    except (jwt.exceptions.DecodeError, model.DoesNotExist):
        return AnonymousUser()


class JWTMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, recieve, send):
        headers_dict = dict(scope["headers"])
        cookies_str = headers_dict.get(b"cookie", b"").decode()
        cookies = {
            cookie.split("=")[0]: cookie.split("=")[1]
            for cookie in cookies_str.split("; ")
        }
        access_token = cookies.get("access")

        scope["token"] = access_token
        scope["user"] = await get_user(scope)

        return await self.app(scope, recieve, send)
