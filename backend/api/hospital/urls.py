from .views import CloseHospitalByLocationView
from django.urls import path

urlpatterns = [
    path("nearby", CloseHospitalByLocationView.as_view(), name="nearby")
]
