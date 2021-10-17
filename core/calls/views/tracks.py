from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.calls.serializers.tracks import TrackSerializer, TracksSerializer
from core.projects.models import Project


class TracksApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        pass

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        context = {'user': request.user, 'project': project}
        serializer = TrackSerializer(data=request.data, context=context)
        if serializer.is_valid():
            track = serializer.save()

            payload = TracksSerializer(track, many=False).data
            return Response(payload, status=status.HTTP_201_CREATED)

        return Response(
            {
                'message': 'Error happened while creating track',
                'level': 'error',
                'data': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
