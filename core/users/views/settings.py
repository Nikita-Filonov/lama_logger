from rest_framework import views
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from utils.exeptions import BadRequest
from ..models import UserSettings
from ..serializers.settings import UserSettingsSerializer, UserSettingSerializer


class UserSettingsApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request):
        settings = UserSettings.objects.get(user=request.user)
        serializer = UserSettingsSerializer(settings, many=False)
        return Response(serializer.data)

    def patch(self, request):
        settings = UserSettings.objects.get(user=request.user)
        serializer = UserSettingSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            settings = serializer.save()
            serializer = UserSettingsSerializer(settings, many=False)
            return Response(serializer.data)

        raise BadRequest('Error happened while updating user settings', data=serializer.errors)
