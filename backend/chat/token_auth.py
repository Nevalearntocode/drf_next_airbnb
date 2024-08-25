from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.tokens import AccessToken
from users.models import CustomUser


@database_sync_to_async
def get_user(user_id):
    try:
        return CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return AnonymousUser()


class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query = dict((x.split("=") for x in scope["query_string"].decode().split("&")))
        user_id = query.get("user")
        scope["user"] = await get_user(user_id)
        return await super().__call__(scope, receive, send)
