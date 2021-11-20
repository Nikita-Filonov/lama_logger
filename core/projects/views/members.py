import threading

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.projects.helpers.utils import member_invite_mail
from core.projects.models import Member, Project
from core.projects.permissions.common import IsMemberActionAllowed
from core.projects.serializers.members import MemberSerializer
from core.projects.serializers.projects import ProjectsSerializer
from core.users.models import CustomUser


class MembersApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsMemberActionAllowed]

    def post(self, request, project_id):
        username = request.data.get('username')
        try:
            user = CustomUser.objects.get(Q(username=username) | Q(email=username))
        except ObjectDoesNotExist:
            return Response(
                {'message': f'User "{username}" does not exists', 'level': 'error'},
                status=status.HTTP_404_NOT_FOUND
            )
        # getting project where we want to add member
        project = Project.objects.get(id=project_id)

        # getting all project where <user> is member
        is_member = project.members.filter(user=user)

        if is_member:
            # if group where we want to add <user>
            # already contains this user the we return error
            return Response({
                'message': f'Member "{username}" already exists',
                'level': 'warning'
            }, status=status.HTTP_406_NOT_ACCEPTABLE)

        member = Member.objects.create(user=user)
        member.roles.set(request.data.get('roles'))
        project.members.add(member)

        if request.data.get('notify'):
            thread = threading.Thread(target=member_invite_mail, args=(user, request.user, project))
            thread.start()

        return Response(ProjectsSerializer(project, many=False).data)

    def delete(self, request, project_id):
        members = request.data.get('members', [])
        members_to_delete = Member.objects.filter(id__in=members)
        members_to_delete.delete()

        project = Project.objects.get(id=project_id)
        return Response(ProjectsSerializer(project, many=False).data)


class MemberApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsMemberActionAllowed]

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
