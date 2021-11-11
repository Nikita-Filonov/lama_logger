from django.urls import path

from core.calls.views.custom_requests import CustomRequestsApi, CustomRequestApi, custom_request_send
from core.calls.views.custom_requests_history import CustomRequestsHistoryApi
from core.calls.views.requests import RequestsApi, RequestApi, create_request, delete_all_requests
from core.calls.views.requests_filters import RequestsFiltersApi, RequestsFilterApi

urlpatterns = [
    path('projects/<int:project_id>/requests/', RequestsApi.as_view(), name='requests'),
    path('projects/<int:project_id>/requests/clear-all/', delete_all_requests, name='delete_all_requests'),
    path('projects/<int:project_id>/requests/create/', create_request, name='create_request'),
    path('projects/<int:project_id>/requests/filters/', RequestsFiltersApi.as_view(), name='requests_filters'),
    path('projects/<int:project_id>/requests/filters/<int:filter_id>/', RequestsFilterApi.as_view(),
         name='requests_filter'),
    path('projects/<int:project_id>/requests/<str:request_id>/', RequestApi.as_view(), name='request'),

    path('projects/<int:project_id>/custom-requests/', CustomRequestsApi.as_view(), name='custom_requests'),
    path('projects/<int:project_id>/custom-requests/<str:request_id>/', CustomRequestApi.as_view(),
         name='custom_request'),
    path('projects/<int:project_id>/custom-requests/<str:request_id>/send/', custom_request_send,
         name='custom_request_send'),
    path('projects/<int:project_id>/custom-requests-history/', CustomRequestsHistoryApi.as_view(),
         name='custom_requests_history')
]
