from rest_framework import status, views
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.projects.models import ProjectSettings
from core.projects.serializers.settings import ProjectSettingsSerializer, ProjectSettingSerializer


class ProjectSettingsApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        project_settings = ProjectSettings.objects.get(project_id=project_id)
        return Response(ProjectSettingsSerializer(project_settings, many=False).data)

    def patch(self, request, project_id):
        project_settings = ProjectSettings.objects.get(project_id=project_id)
        serializer = ProjectSettingSerializer(project_settings, data=request.data, partial=True)
        if serializer.is_valid():
            project_settings = serializer.save()
            return Response(ProjectSettingsSerializer(project_settings, many=False).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
