from rest_framework import views
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.tracks.models import Track
from core.tracks.serializers.requests import TrackRequestsSerializer


class TrackRequestsApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id, track_id):
        track = Track.objects.get(id=track_id)
        track_requests = track.requests.all()
        serializer = TrackRequestsSerializer(track_requests, many=True)
        return Response(serializer.data)
