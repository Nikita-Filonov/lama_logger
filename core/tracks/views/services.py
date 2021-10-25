from typing import List, Dict, Union

from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, throttle_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.tracks.models import ServiceActivity, Service
from core.tracks.serializers.services import ServiceSerializer, ServicesSerializer
from utils.exeptions import BadRequest


class ServicesApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request, project_id, activity_id):
        activity = ServiceActivity.objects.get(id=activity_id)
        serializer = ServiceSerializer(data=request.data, context={'activity': activity})
        if serializer.is_valid():
            service = serializer.save()

            payload = ServicesSerializer(service, many=False).data
            return Response(payload, status=status.HTTP_201_CREATED)

        raise BadRequest('Error happened while creating service')


@api_view(['PATCH'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def move_services(request, project_id):
    activities: List[Dict[str, Union[int, List[Dict[str, int]]]]] = request.data
    for activity_payload in activities:
        activity = ServiceActivity.objects.get(id=activity_payload['activityId'])

        for service_payload in activity_payload['services']:
            service = Service.objects.get(id=service_payload['id'])
            service.index = service_payload['index']
            service.save()

        new_services = list(map(lambda s: s['id'], activity_payload['services']))
        activity.services.set(new_services)

    return Response(status=status.HTTP_204_NO_CONTENT)
