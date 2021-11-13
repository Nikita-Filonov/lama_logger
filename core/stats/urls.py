from django.urls import path

from core.stats.views.requests_stats import get_requests_stats, get_ratio_status_codes

urlpatterns = [
    path('projects/<int:project_id>/requests/stats/', get_requests_stats, name='get_requests_stats'),
    path('projects/<int:project_id>/requests/ratio-status-codes/', get_ratio_status_codes,
         name='get_ratio_status_codes')
]
