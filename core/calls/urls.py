from django.urls import path

from core.calls.views.custom_requests import CustomRequestsApi
from core.calls.views.requests import RequestsApi, RequestApi, request_to_curl

urlpatterns = [
    path('projects/<int:project_id>/requests/', RequestsApi.as_view(), name='requests'),
    path('projects/<int:project_id>/requests/custom/', CustomRequestsApi.as_view(), name='custom_requests'),
    path('projects/<int:project_id>/requests/<str:requestId>/', RequestApi.as_view(), name='request'),
    path('projects/<int:project_id>/requests/<str:requestId>/curl/', request_to_curl, name='request_to_curl'),
]
