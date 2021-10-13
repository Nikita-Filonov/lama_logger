from django.urls import path

from core.stats.views.requests_stats import get_requests_stats

urlpatterns = [
    path('projects/<int:project_id>/requests/stats/', get_requests_stats, name='get_requests_stats'),
]
