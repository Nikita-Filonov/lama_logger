from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import exceptions
from rest_framework.authentication import TokenAuthentication

from core.users.models import ApiToken


class IntegrationTokenAuthentication(TokenAuthentication):
    keyword = 'Token'
    model = ApiToken

    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(token=key)
        except (model.DoesNotExist, ValidationError):
            raise exceptions.AuthenticationFailed(_('Invalid token.'))

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))

        return token.user, token
