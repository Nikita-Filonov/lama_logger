from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.projects.models import Project, Role
from core.projects.permissions.common import IsRoleActionAllowed
from core.projects.serializers.projects import ProjectsSerializer
from core.projects.serializers.roles import RoleSerializer
from utils.helpers.common import delete_model


class RolesApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsRoleActionAllowed]
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


class RoleApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsRoleActionAllowed]
    throttle_classes = [UserRateThrottle]

    def patch(self, request, project_id, role_id):
        role = Role.objects.get(id=role_id)
        serializer = RoleSerializer(role, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            project = Project.objects.get(id=project_id)
            return Response(ProjectsSerializer(project, many=False).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, project_id, role_id):
        delete_model(Role, id=role_id)

        project = Project.objects.get(id=project_id)
        serializer = ProjectsSerializer(project, many=False)
        return Response(serializer.data)
