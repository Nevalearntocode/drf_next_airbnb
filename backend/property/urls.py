from django.urls import path, include
from .views import (
    PropertyViewset,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("properties", PropertyViewset, basename="property")

urlpatterns = router.urls
