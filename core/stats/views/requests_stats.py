from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.stats.models import RequestStat


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def get_requests_stats(request, project_id):
    requests_stats = RequestStat.objects.filter(project_id=project_id)
    return Response({})
