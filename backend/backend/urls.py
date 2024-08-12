from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

api_urlpatterns = [
    path("", include("djoser.urls")), 
    path("", include("users.urls")),
    path("", include("property.urls")),
    path("", include("reservation.urls")),
    path("", include("favorite.urls")),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(api_urlpatterns)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
