from django.urls import path

from core.tracks.views.activities import ServiceActivitiesApi
from core.tracks.views.services import ServicesApi

urlpatterns = [
    path('projects/<int:project_id>/activities/', ServiceActivitiesApi.as_view(), name='activities'),
    path('projects/<int:project_id>/services/', ServicesApi.as_view(), name='services'),
]
