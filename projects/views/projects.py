from rest_framework import views
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from settings.models import Settings
from settings.serializers import SettingsSerializer


class SettingsApi(views.APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        settings = Settings.objects.get(user=request.user)

        return Response(
            SettingsSerializer(settings, many=False).data
        )
