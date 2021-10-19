from django.urls import path

from core.users.views.authentication import registration
from core.users.views.tokens import TokensApi, delete_token
from core.users.views.users import UserApi

urlpatterns = [
    path('registration/', registration, name='registration'),
    path('user/', UserApi.as_view(), name='user'),
    path('user/tokens/', TokensApi.as_view(), name='tokens'),
    path('user/tokens/<int:token_id>/', delete_token, name='delete_token')
]
