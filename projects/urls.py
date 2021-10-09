from django.urls import path

from projects.views.members import MemberApi, MembersApi
from projects.views.projects import ProjectsApi, ProjectApi
from projects.views.requests import RequestsApi, RequestApi, request_to_curl

urlpatterns = [
    path('projects/', ProjectsApi.as_view(), name='projects'),
    path('projects/<int:project_id>/', ProjectApi.as_view(), name='project'),
    path('projects/<int:project_id>/members/', MembersApi.as_view(), name='members'),
    path('projects/<int:project_id>/members/<int:member_id>/', MemberApi.as_view(), name='member'),
    path('projects/<int:project_id>/requests/', RequestsApi.as_view(), name='requests'),
    path('projects/<int:project_id>/requests/<str:request_id>/', RequestApi.as_view(), name='request'),
    path('projects/<int:project_id>/requests/<str:request_id>/curl/', request_to_curl, name='request_to_curl'),
]
