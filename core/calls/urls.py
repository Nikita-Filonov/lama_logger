from django.urls import path

from core.calls.views.requests import RequestsApi, RequestApi, request_to_curl

urlpatterns = [
    path('projects/<int:project_id>/requests/', RequestsApi.as_view(), name='requests'),
    path('projects/<int:project_id>/requests/<str:request_id>/', RequestApi.as_view(), name='request'),
    path('projects/<int:project_id>/requests/<str:request_id>/curl/', request_to_curl, name='request_to_curl'),
]
