import json

from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.projects.models import Project
from core.tracks.models import Track, Service
from core.tracks.serializers.tracks import TracksSerializer, TrackSerializer
from utils.exeptions import BadRequest


class ServicesApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        filters = json.loads(request.query_params.get('filters', '{}'))
        tracks = Track.objects.filter(**filters, project_id=project_id).order_by('-created')

        results = self.paginate_queryset(tracks, request, view=self)
        serializer = TracksSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request, project_id):
        project = Service.objects.get(id=project_id)
        context = {'user': request.user, 'project': project}
        serializer = TrackSerializer(data=request.data, context=context)
        if serializer.is_valid():
            track = serializer.save()

            payload = TracksSerializer(track, many=False).data
            return Response(payload, status=status.HTTP_201_CREATED)

        raise BadRequest('Error happened while creating track')
