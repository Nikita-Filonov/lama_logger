from rest_framework import serializers

from projects.models import Project, Member, Role
from projects.permissions.roles import Admin, AccountManager, Editor, Viewer
from projects.serializers.members import MembersSerializer
from projects.serializers.roles import RolesSerializer
from users.serializers.users import DefaultUserSerializer


class ProjectsSerializer(serializers.ModelSerializer):
    members = MembersSerializer(many=True, read_only=True)
    roles = RolesSerializer(many=True, read_only=True)
    creator = DefaultUserSerializer(many=False, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
        project = Project.objects.create(**validated_data, creator=self.context)

        for role in [Admin, Editor, AccountManager, Viewer]:
            created_role = Role.objects.create(name=role.name, scope=role.scopes)
            project.roles.add(created_role)

        roles = project.roles.all()

        member = Member.objects.create(user=self.context)
        member.roles.set(roles)
        project.members.add(member)

        return project
