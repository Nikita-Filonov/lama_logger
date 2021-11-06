from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from ..models import UserSettings
from ..serializers.settings import UserSettingsSerializer


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def get_user_settings(request):
    settings = UserSettings.objects.get(user=request.user)
    serializer = UserSettingsSerializer(settings, many=False)
    return Response(serializer.data)
