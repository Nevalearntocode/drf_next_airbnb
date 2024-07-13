from django.urls import path, include
from .views import ListCreatePropertyView, RetrieveUpdateDestroyPropertyView

urlpatterns = [
    path("", ListCreatePropertyView.as_view(), name="properties"),
    path(
        "detail/<str:pk>/",
        RetrieveUpdateDestroyPropertyView.as_view(),
        name="property-detail",
    ),
    path("me/", ListCreatePropertyView.as_view(), name="my-properties"),
]
