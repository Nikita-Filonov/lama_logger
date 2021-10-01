from django.db.models import Q
from rest_framework import views, status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from projects.helpers.utils import query_to_dict
from projects.models import Project
from projects.serializers.projects import ProjectsSerializer, ProjectSerializer


class ProjectsApi(views.APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        projects = Project.objects.filter(
            (Q(members__user__in=[request.user]) | Q(creator=request.user)) &
            Q(**query_to_dict(request.query_params))
        )

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
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
