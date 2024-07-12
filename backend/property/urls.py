from django.urls import path, include
from .views import ListCreatePropertyView

urlpatterns = [
    path("", ListCreatePropertyView.as_view()),
    path("me/", ListCreatePropertyView.as_view()),
]
