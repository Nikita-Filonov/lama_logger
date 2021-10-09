from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from projects.models import Project
from projects.serializers.projects import ProjectsSerializer
from projects.serializers.roles import RoleSerializer


class RolesApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        serializer = RoleSerializer(data=request.data)
        if serializer.is_valid():
            role = serializer.save()
            project.roles.add(role)

            return Response(
                ProjectsSerializer(project, many=False).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
