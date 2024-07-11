from django.urls import path, include
from .views import ListCreatePropertyView

urlpatterns = [
    path("", ListCreatePropertyView.as_view()),
]
