from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.projects.models import ProjectSettings
from core.projects.serializers.settings import ProjectSettingsSerializer


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def get_project_settings(request, project_id):
    project_settings = ProjectSettings.objects.get(project_id=project_id)
    return Response(ProjectSettingsSerializer(project_settings, many=False).data)
