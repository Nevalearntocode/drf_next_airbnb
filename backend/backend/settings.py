# relative path: backend\backend\settings.py

from pathlib import Path
from os import getenv, path
from datetime import timedelta
import dj_database_url
import dotenv


BASE_DIR = Path(__file__).resolve().parent.parent

dotenv_file = BASE_DIR.parent / ".env.dev"

if path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)


SECRET_KEY = getenv("SECRET_KEY")

DEBUG = getenv("DEBUG") == "1"

ALLOWED_HOSTS = getenv("ALLOWED_HOSTS").split(",")


INSTALLED_APPS = [
    # External
    "rest_framework",
    "djoser",
    "social_django",
    "corsheaders",
    "django_celery_beat",
    # Internal
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "users",
    "property",
    "reservation",
    "favorite",
    "chat",
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
ASGI_APPLICATION = "backend.asgi.application"

LOCAL = getenv("LOCAL") == "1"

CELERY_BROKER = getenv("CELERY_BROKER", "redis://127.0.0.1:6379/0")
CELERY_BACKEND = getenv("CELERY_BACKEND", "django-db")
ENGINE = getenv("SQL_ENGINE")
NAME = getenv("SQL_DATABASE")
USER = getenv("DOCKER_SQL_USER")
PASSWORD = getenv("DOCKER_SQL_PASSWORD")
HOST = getenv("DOCKER_SQL_HOST")
PORT = getenv("DOCKER_SQL_PORT")

if LOCAL:
    USER = getenv("LOCAL_SQL_USER")
    PASSWORD = getenv("LOCAL_SQL_PASSWORD")
    HOST = getenv("LOCAL_SQL_HOST")
    PORT = getenv("LOCAL_SQL_PORT")
    CELERY_BROKER = "redis://127.0.0.1:6379/0"
    CELERY_BACKEND = "django-db"

DATABASES = {
    "default": {
        "ENGINE": ENGINE,
        "NAME": NAME,
        "USER": USER,
        "PASSWORD": PASSWORD,
        "HOST": HOST,
        "PORT": PORT,
    },
}

DATABASES["default"] = dj_database_url.parse(getenv("DATABASE_URL"))


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

AUTHENTICATION_BACKENDS = (
    "social_core.backends.google.GoogleOAuth2",
    "django.contrib.auth.backends.ModelBackend",
)

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = getenv("GOOGLE_OAUTH2_KEY")
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = getenv("GOOGLE_OAUTH2_SECRET")
# This line specifies the scopes that the Google OAuth2 authentication backend should request from the user's Google account.
# The scopes are URLs that define the types of information that the application is allowed to access. Here are the scopes that are being requested:
# - "https://www.googleapis.com/auth/userinfo.email": This scope allows the application to access the user's email address.
# - "https://www.googleapis.com/auth/userinfo.profile": This scope allows the application to access the user's basic profile information, such as their name and profile picture.
# - "openid": This scope allows the application to authenticate the user and obtain an OpenID Connect ID token. This token contains information about the user, such as their email address and name.
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "users.authentication.CustomJWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

AUTH_USER_MODEL = "users.CustomUser"

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [
                f"redis://{getenv('REDIS_USER')}:{getenv('REDIS_PASSWORD')}@{getenv('REDIS_HOST')}:{getenv('REDIS_PORT')}/0",
                # ("redis", 6379),
            ],
        },
    },
}

DJOSER = {
    "LOGIN_FIELD": "email",
    "USER_CREATE_PASSWORD_RETYPE": True,
    "SERIALIZERS": {
        "user": "users.serializers.CustomUserSerializer",
        "current_user": "users.serializers.CustomUserSerializer",
    },
    "HIDE_USERS": False,
    "SET_PASSWORD_RETYPE": True,
    "SOCIAL_AUTH_ALLOWED_REDIRECT_URIS": getenv("REDIRECT_URIS").split(","),
    "user": ["djoser.permissions.CurrentUserOrAdminOrReadOnly"],
    "user_list": ["djoser.permissions.CurrentUserOrAdminOrReadOnly"],
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
CLOUDFLARE_R2_BUCKET_URL = getenv("CLOUDFLARE_R2_BUCKET_URL")

CELERY_BROKER_URL = CELERY_BROKER
CELERY_RESULT_BACKEND = CELERY_BACKEND
CELERY_TIMEZONE = "Asia/Bangkok"

if CELERY_RESULT_BACKEND == "django-db":
    INSTALLED_APPS += [
        "django_celery_results",
    ]

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
    "daphne": {
        "handlers": [
            "console",
        ],
        "level": "DEBUG",
    },
}
