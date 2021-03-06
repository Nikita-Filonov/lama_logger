from django.urls import path

from core.tracks.views.activities import ServiceActivitiesApi, move_activities, ServiceActivityApi
from core.tracks.views.requests import TrackRequestsApi
from core.tracks.views.services import ServicesApi, move_services
from core.tracks.views.tracks import TracksApi

urlpatterns = [
    path('projects/<int:project_id>/activities/', ServiceActivitiesApi.as_view(), name='activities'),
    path('projects/<int:project_id>/activities/move/', move_activities, name='move_activities'),
    path('projects/<int:project_id>/activities/<int:activity_id>/', ServiceActivityApi.as_view(), name='activity'),
    path('projects/<int:project_id>/activities/<int:activity_id>/services/', ServicesApi.as_view(), name='services'),
    path('projects/<int:project_id>/activities/services/move/', move_services, name='move_services'),
    path('projects/<int:project_id>/activities/services/<int:service_id>/tracks/', TracksApi.as_view(),
         name='tracks'),
    path('projects/<int:project_id>/tracks/<int:track_id>/requests/', TrackRequestsApi.as_view(),
         name='track_requests')
]
