from django.urls import path

from core.tracks.views.activities import ServiceActivitiesApi
from core.tracks.views.services import ServicesApi
from core.tracks.views.tracks import TracksApi

urlpatterns = [
    path('projects/<int:project_id>/activities/', ServiceActivitiesApi.as_view(), name='activities'),
    path('projects/<int:project_id>/activities/<int:activity_id>/services/', ServicesApi.as_view(), name='services'),
    path('projects/<int:project_id>/activities/services/<int:service_id>/tracks/', TracksApi.as_view(),
         name='tracks'),
]
