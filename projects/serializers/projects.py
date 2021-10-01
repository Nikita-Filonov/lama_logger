from rest_framework import serializers

from projects.models import Project, Member, Role
from projects.permissions.roles import Admin, AccountManager, Editor, Viewer


class ProjectsSerializer(serializers.ModelSerializer):
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

        admin_role = project.roles.get(name='Admin')

        member = Member.objects.create(user=self.context, role=admin_role)
        project.members.add(member)

        return project
