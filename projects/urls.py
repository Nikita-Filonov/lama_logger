from django.urls import path

from projects.views.projects import ProjectsApi
from projects.views.requests import RequestsApi

urlpatterns = [
    path('projects/', ProjectsApi.as_view(), name='projects'),
    path('projects/<int:project_id>/requests/', RequestsApi.as_view(), name='requests'),
]
