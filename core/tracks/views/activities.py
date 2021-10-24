from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.projects.models import Project
from core.tracks.models import ServiceActivity
from core.tracks.serializers.activities import ServiceActivitiesSerializer
from utils.exeptions import BadRequest


class ServiceActivitiesApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        activities = ServiceActivity.objects.filter(project_id=project_id).order_by('-created')
        serializer = ServiceActivitiesSerializer(activities, many=True)
        return Response(serializer.data)

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        serializer = ServiceActivitiesSerializer(data=request.data, context={'project': project})
        if serializer.is_valid():
            activity = serializer.save()
            serializer = ServiceActivitiesSerializer(activity, many=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        raise BadRequest('Error happened while creating activity')
