from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.tracks.models import Service
from core.tracks.serializers.tracks import TracksSerializer, TrackSerializer
from utils.exeptions import BadRequest


class TracksApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request, project_id, service_id):
        serializer = TrackSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            service = Service.objects.get(id=service_id)
            track = serializer.save()
            service.tracks.add(track)

            payload = TracksSerializer(track, many=False).data
            return Response(payload, status=status.HTTP_201_CREATED)

        raise BadRequest('Error happened while creating track')
