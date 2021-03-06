from django.urls import path

from core.performance.views.transactions import TransactionsApi

urlpatterns = [
    path('projects/<int:project_id>/transactions/', TransactionsApi.as_view(), name='transactions'),
]
