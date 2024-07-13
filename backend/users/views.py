from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.set_cookie(
            "access",
            httponly=settings.AUTH_COOKIE_HTTPONLY,
            samesite=settings.AUTH_COOKIE_SAMESITE,
            secure=settings.AUTH_COOKIE_SECURE,
            max_age=0,
            path="/",
        )
        response.set_cookie(
            "refresh",
            httponly=settings.AUTH_COOKIE_HTTPONLY,
            samesite=settings.AUTH_COOKIE_SAMESITE,
            secure=settings.AUTH_COOKIE_SECURE,
            max_age=0,
            path="/",
        )
        return response


class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get("access")

        if access_token:
            request.data["token"] = access_token

        response = super().post(request, *args, **kwargs)
        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh")

        if refresh_token:
            request.data["refresh"] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data["access"]
            response.set_cookie(
                "access",
                access_token,
                httponly=settings.AUTH_COOKIE_HTTPONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE,
                secure=settings.AUTH_COOKIE_SECURE,
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
            )

        return response


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data["access"]
            refresh_token = response.data["refresh"]

            response.set_cookie(
                "access",
                access_token,
                httponly=settings.AUTH_COOKIE_HTTPONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE,
                secure=settings.AUTH_COOKIE_SECURE,
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
            )
            response.set_cookie(
                "refresh",
                refresh_token,
                httponly=settings.AUTH_COOKIE_HTTPONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE,
                secure=settings.AUTH_COOKIE_SECURE,
                max_age=settings.AUTH_COOKIE_REFRESH_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
            )

        return response
