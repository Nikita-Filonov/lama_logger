from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from projects.models import Member, Project
from projects.serializers.members import MemberSerializer
from projects.serializers.projects import ProjectsSerializer


class MemberApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, project_id, member_id):
        member = Member.objects.get(id=member_id)
        serializer = MemberSerializer(member, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            project = Project.objects.get(id=project_id)
            return Response(ProjectsSerializer(project, many=False).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, project_id, member_id):
        pass
