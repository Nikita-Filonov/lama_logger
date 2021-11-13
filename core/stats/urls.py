from django.urls import path

from core.stats.views.requests_stats import get_ratio_status_codes, get_number_of_requests, get_requests_stats, \
    get_response_time

urlpatterns = [
    path('projects/<int:project_id>/stats/requests-stats/', get_requests_stats,
         name='get_requests_stats'),
    path('projects/<int:project_id>/stats/number-of-requests/', get_number_of_requests,
         name='get_number_of_requests'),
    path('projects/<int:project_id>/stats/ratio-status-codes/', get_ratio_status_codes,
         name='get_ratio_status_codes'),
    path('projects/<int:project_id>/stats/response-time/', get_response_time,
         name='get_response_time')
]
