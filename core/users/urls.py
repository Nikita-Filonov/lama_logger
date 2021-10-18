from django.urls import path

from core.users.views.authentication import registration

urlpatterns = [
    path('registration/', registration, name='registration')
]
