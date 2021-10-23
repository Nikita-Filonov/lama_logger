import json

from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.projects.models import Project
from core.tracks.models import Track
from core.tracks.serializers.tracks import TracksSerializer, TrackSerializer
from utils.exeptions import BadRequest


class TracksApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        context = {'user': request.user, 'project': project}
        serializer = TrackSerializer(data=request.data, context=context)
        if serializer.is_valid():
            track = serializer.save()

            payload = TracksSerializer(track, many=False).data
            return Response(payload, status=status.HTTP_201_CREATED)

        raise BadRequest('Error happened while creating track')
