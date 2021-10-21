from django.db.models import Q
from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.projects.helpers.utils import query_to_dict
from core.projects.models import Project
from core.projects.serializers.projects import ProjectsSerializer, ProjectSerializer


class ProjectsApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        projects = Project.objects.filter(
            (Q(members__user__in=[request.user]) | Q(creator=request.user)) &
            Q(**query_to_dict(request.query_params))
        ).distinct()

        return Response(ProjectsSerializer(projects, many=True).data)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data, context=request.user)
        if serializer.is_valid():
            project = serializer.save()

            return Response(
                ProjectsSerializer(project, many=False).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            {
                'message': 'Error happened while creating project',
                'level': 'error',
                'data': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )


class ProjectApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, project_id):
        projects = Project.objects.get(id=project_id)

        return Response(ProjectsSerializer(projects, many=False).data)

    def patch(self, request, project_id):
        project = Project.objects.get(id=project_id)
        serializer = ProjectSerializer(project, data=request.data, partial=True)

        if serializer.is_valid():
            project = serializer.save()
            return Response(ProjectsSerializer(project, many=False).data)

        return Response(
            {
                'message': 'Error happened while updating project',
                'level': 'error',
                'data': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
