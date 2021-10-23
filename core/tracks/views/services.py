from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.tracks.models import ServiceActivity
from core.tracks.serializers.services import ServiceSerializer, ServicesSerializer
from utils.exeptions import BadRequest


class ServicesApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request, project_id, activity_id):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            activity = ServiceActivity.objects.get(id=activity_id)
            service = serializer.save()
            activity.services.add(service)

            payload = ServicesSerializer(service, many=False).data
            return Response(payload, status=status.HTTP_201_CREATED)

        raise BadRequest('Error happened while creating service')
