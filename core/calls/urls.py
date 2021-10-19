from django.urls import path

from core.calls.views.requests import RequestsApi, RequestApi, request_to_curl, create_request
from core.calls.views.tracks import TracksApi

urlpatterns = [
    path('projects/<int:project_id>/requests/', RequestsApi.as_view(), name='requests'),
    path('projects/<int:project_id>/requests/create/', create_request, name='create_request'),
    path('projects/<int:project_id>/requests/<str:request_id>/', RequestApi.as_view(), name='request'),
    path('projects/<int:project_id>/requests/<str:request_id>/curl/', request_to_curl, name='request_to_curl'),
    path('projects/<int:project_id>/tracks/', TracksApi.as_view(), name='tracks'),
]
