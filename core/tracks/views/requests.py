import json

from rest_framework import views
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle

from core.tracks.models import Track
from core.tracks.serializers.requests import TrackRequestsSerializer


class TrackRequestsApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id, track_id):
        filters = json.loads(request.query_params.get('filters', '{}'))
        track = Track.objects.get(id=track_id)
        track_requests = track.requests.filter(**filters)

        results = self.paginate_queryset(track_requests, request, view=self)
        serializer = TrackRequestsSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)
