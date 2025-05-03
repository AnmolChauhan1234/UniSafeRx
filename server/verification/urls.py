# blockchain/urls.py
from django.urls import path
from .views import FullVerifyView

urlpatterns = [
    path("full-verify/", FullVerifyView.as_view(), name="full-verify"),
]
