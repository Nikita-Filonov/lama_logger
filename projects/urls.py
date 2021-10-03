from django.urls import path

from projects.views.projects import ProjectsApi
from projects.views.requests import RequestsApi, request_to_curl

urlpatterns = [
    path('projects/', ProjectsApi.as_view(), name='projects'),
    path('projects/<int:project_id>/requests/', RequestsApi.as_view(), name='requests'),
    path('projects/<int:project_id>/requests/<int:request_id>/curl/', request_to_curl, name='request_to_curl'),
]
