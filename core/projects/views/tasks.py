from rest_framework import views
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.projects.models import ProjectTask, Project
from core.projects.serializers.tasks import ProjectTasksSerializer, ProjectTaskSerializer
from utils.exeptions import BadRequest


class ProjectTasksApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        tasks = ProjectTask.objects.filter(project_id=project_id)
        serializer = ProjectTasksSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        context = {'project': project, 'request': request}
        serializer = ProjectTaskSerializer(data=request.data, context=context)
        if serializer.is_valid():
            project_task = serializer.save()
            return Response(ProjectTasksSerializer(project_task, many=False).data)

        raise BadRequest(message='Error happened while creating task', data=serializer.errors)


class ProjectTaskApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def patch(self, request, project_id, task_id):
        task = ProjectTask.objects.get(id=task_id)
        context = {'request': request}
        serializer = ProjectTaskSerializer(task, data=request.data, partial=True, context=context)
        if serializer.is_valid():
            project_task = serializer.save()
            return Response(ProjectTasksSerializer(project_task, many=False).data)

        raise BadRequest(message='Error happened while updating task', data=serializer.errors)
