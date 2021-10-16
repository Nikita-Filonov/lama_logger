from itertools import groupby

from rest_framework import serializers

from core.projects.models import Project, Member, Role
from core.projects.permissions.roles import Admin, AccountManager, Editor, Viewer
from core.projects.serializers.members import MembersSerializer
from core.projects.serializers.roles import RolesSerializer
from core.stats.helper.utils import group_types, filter_action
from core.stats.models import RequestStat
from core.users.serializers.users import DefaultUserSerializer


class ProjectsSerializer(serializers.ModelSerializer):
    members = MembersSerializer(many=True, read_only=True)
    roles = RolesSerializer(many=True, read_only=True)
    creator = DefaultUserSerializer(many=False, read_only=True)
    stats = serializers.SerializerMethodField('get_stats')
    membersCount = serializers.SerializerMethodField('get_members_count')
    requestsCount = serializers.SerializerMethodField('get_requests_count')

    class Meta:
        model = Project
        exclude = ('requests',)

    @staticmethod
    def get_members_count(obj: Project):
        return obj.members.count()

    @staticmethod
    def get_requests_count(obj: Project):
        return obj.requests.count()

    @staticmethod
    def get_stats(obj: Project):
        requests_stats = RequestStat.objects.filter(project=obj).order_by('created')

        group_type = group_types['days']
        grouped_stats_payload = [
            {
                'name': created.strftime(group_type['format']),
                'Created': filter_action('create', list(grouped_stats)),
            }
            for created, grouped_stats in groupby(requests_stats, key=group_type['func'])
        ]

        return grouped_stats_payload


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
