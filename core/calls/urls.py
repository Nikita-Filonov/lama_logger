from django.urls import path

from core.calls.views.custom_requests import CustomRequestsApi
from core.calls.views.requests import RequestsApi, RequestApi, request_to_curl, create_request
from core.calls.views.requests_filters import RequestsFiltersApi, RequestsFilterApi

urlpatterns = [
    path('projects/<int:project_id>/requests/', RequestsApi.as_view(), name='requests'),
    path('projects/<int:project_id>/requests/create/', create_request, name='create_request'),
    path('projects/<int:project_id>/requests/filters/', RequestsFiltersApi.as_view(), name='requests_filters'),
    path('projects/<int:project_id>/requests/filters/<int:filter_id>/', RequestsFilterApi.as_view(),
         name='requests_filter'),
    path('projects/<int:project_id>/requests/<str:request_id>/', RequestApi.as_view(), name='request'),
    path('projects/<int:project_id>/requests/<str:request_id>/curl/', request_to_curl, name='request_to_curl'),

    path('projects/<int:project_id>/custom-requests/', CustomRequestsApi.as_view(), name='custom_requests')
]
