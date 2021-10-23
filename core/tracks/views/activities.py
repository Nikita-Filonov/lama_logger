from rest_framework import views
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.tracks.models import ServiceActivity
from core.tracks.serializers.activities import ServiceActivitiesSerializer


class ServiceActivitiesApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        activities = ServiceActivity.objects.filter(project_id=project_id).order_by('-created')
        serializer = ServiceActivitiesSerializer(activities, many=True)
        return Response(serializer.data)
