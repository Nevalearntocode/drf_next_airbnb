# relative path: backend\backend\settings.py

from pathlib import Path
from os import getenv, path
from datetime import timedelta
import dotenv


BASE_DIR = Path(__file__).resolve().parent.parent

dotenv_file = BASE_DIR.parent / ".env.dev"

if path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)


SECRET_KEY = getenv("SECRET_KEY")

DEBUG = getenv("DEBUG") == "True"

ALLOWED_HOSTS = getenv("ALLOWED_HOSTS").split(",")


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "djoser",
    "corsheaders",
    "users",
    "property",
    "reservation",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


DATABASES = {
    # "default": {
    #     "ENGINE": getenv("SQL_ENGINE"),
    #     "NAME": getenv("SQL_DATABASE"),
    #     "USER": getenv("SQL_USER"),
    #     "PASSWORD": getenv("SQL_PASSWORD"),
    #     "HOST": getenv("SQL_HOST"),
    #     "PORT": getenv("SQL_PORT"),
    # },
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    },
}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


STATIC_URL = "static/"
MEDIA_URL = "media/"
STATIC_ROOT = BASE_DIR / "static"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "users.authentication.CustomJWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

AUTH_USER_MODEL = "users.CustomUser"

DJOSER = {
    "LOGIN_FIELD": "email",
    "USER_CREATE_PASSWORD_RETYPE": True,
    "SERIALIZERS": {
        "user": "users.serializers.CustomUserSerializer",
        "current_user": "users.serializers.CustomUserSerializer",
    },
    "HIDE_USERS": False,
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": False,
    "UPDATE_LAST_LOGIN": True,
    "SIGNING_KEY": getenv("SIGNING_KEY"),
}

CORS_ALLOWED_ORIGINS = getenv("CORS_ALLOWED_ORIGINS").split(",")
CORS_ALLOW_CREDENTIALS = True

AUTH_COOKIE_HTTPONLY = getenv("AUTH_COOKIE_HTTPONLY") == "True"
AUTH_COOKIE_SECURE = getenv("AUTH_COOKIE_SECURE") == "True"
AUTH_COOKIE_SAMESITE = getenv("AUTH_COOKIE_SAMESITE")
AUTH_COOKIE_PATH = getenv("AUTH_COOKIE_PATH")
AUTH_COOKIE_ACCESS_MAX_AGE = 60 * 60
AUTH_COOKIE_REFRESH_MAX_AGE = 60 * 60 * 24 * 7

WEBSITE_URL = getenv("WEBSITE_URL")

CLOUDFLARE_R2_ACCESS_KEY_ID = getenv("CLOUDFLARE_R2_ACCESS_KEY_ID")
CLOUDFLARE_R2_SECRET_ACCESS_KEY = getenv("CLOUDFLARE_R2_SECRET_ACCESS_KEY")
CLOUDFLARE_R2_BUCKET_NAME = getenv("CLOUDFLARE_R2_BUCKET_NAME")
CLOUDFLARE_R2_ENDPOINT = getenv("CLOUDFLARE_R2_ENDPOINT")
