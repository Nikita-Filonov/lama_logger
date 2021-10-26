from typing import List, Dict

from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.projects.models import Project
from core.tracks.models import ServiceActivity
from core.tracks.serializers.activities import ServiceActivitiesSerializer, ServiceActivitySerializer
from utils.exeptions import BadRequest, NotFound


class ServiceActivitiesApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        activities = ServiceActivity.objects.filter(project_id=project_id).order_by('index')
        serializer = ServiceActivitiesSerializer(activities, many=True)
        return Response(serializer.data)

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        serializer = ServiceActivitySerializer(data=request.data, context={'project': project})
        if serializer.is_valid():
            activity = serializer.save()
            serializer = ServiceActivitiesSerializer(activity, many=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        raise BadRequest('Error happened while creating activity', data=serializer.errors)


class ServiceActivityApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def delete(self, request, project_id, activity_id):
        try:
            activity = ServiceActivity.objects.get(id=activity_id)
            activity.delete()
        except ServiceActivity.DoesNotExist:
            raise NotFound('Activity not found')

        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['PATCH'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def move_activities(request, project_id):
    new_indexes: List[Dict[str, int]] = request.data
    for index in new_indexes:
        activity = ServiceActivity.objects.get(id=index['id'])
        activity.index = index['index']
        activity.save()

    return Response(status=status.HTTP_204_NO_CONTENT)
