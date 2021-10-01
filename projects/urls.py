from django.urls import path

from projects.views.projects import ProjectsApi

urlpatterns = [
    path('projects/', ProjectsApi.as_view(), name='projects'),
]
