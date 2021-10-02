from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from projects.models import Project
from projects.serializers.requests import RequestsSerializer, RequestSerializer


class RequestsApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        project = Project.objects.get(id=project_id)
        requests = project.requests.all()
        return Response(RequestsSerializer(requests, many=True).data)

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            created_request = serializer.save()
            created_request.user = request.user
            project.requests.add(created_request)

            return Response(
                RequestsSerializer(created_request, many=False).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
