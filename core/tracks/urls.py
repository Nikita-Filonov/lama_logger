from django.urls import path

from core.tracks.views.services import ServicesApi

urlpatterns = [
    path('projects/<int:project_id>/services/', ServicesApi.as_view(), name='services'),
]
