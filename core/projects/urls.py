from django.urls import path

from core.projects.views.members import MemberApi, MembersApi
from core.projects.views.projects import ProjectsApi, ProjectApi
from core.projects.views.roles import RolesApi, RoleApi

urlpatterns = [
    path('projects/', ProjectsApi.as_view(), name='projects'),
    path('projects/<int:project_id>/', ProjectApi.as_view(), name='project'),
    path('projects/<int:project_id>/roles/', RolesApi.as_view(), name='roles'),
    path('projects/<int:project_id>/roles/<int:role_id>/', RoleApi.as_view(), name='role'),
    path('projects/<int:project_id>/members/', MembersApi.as_view(), name='members'),
    path('projects/<int:project_id>/members/<int:member_id>/', MemberApi.as_view(), name='member'),
]
