from datetime import datetime, timedelta
from itertools import groupby

from rest_framework import serializers

from core.calls.models import Request
from core.projects.models import Project, Member, Role
from core.projects.permissions.roles import DEFAULT_ROLES
from core.projects.serializers.members import MembersSerializer
from core.projects.serializers.roles import RolesSerializer
from core.stats.helper.utils import group_types, filter_action
from core.stats.models import RequestStat
from core.tracks.models import ServiceActivity
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
        fields = '__all__'

    @staticmethod
    def get_members_count(obj: Project):
        return obj.members.count()

    @staticmethod
    def get_requests_count(obj: Project):
        return Request.objects.filter(project=obj).count()

    @staticmethod
    def get_stats(obj: Project):
        start = datetime.today().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        end = datetime(start.year, start.month, start.day) - timedelta(days=1)
        requests_stats = RequestStat.objects.filter(project=obj, created__range=[start, end]).order_by('created')

        group_type = group_types['days']
        labels, created = [groupby(requests_stats, key=group_type['func']) for _ in range(2)]
        return {
            'labels': [created.strftime(group_type['format']) for created, _ in labels],
            'datasets': [
                {
                    'spanGaps': True,
                    'label': 'Created',
                    'data': [filter_action('create', list(stats)) for _, stats in created],
                    'backgroundColor': '#4169E1',
                },
            ]
        }


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
        project = Project.objects.create(**validated_data, creator=self.context)

        for role in DEFAULT_ROLES:
            created_role = Role.objects.create(name=role.name, scope=role.scopes)
            project.roles.add(created_role)

        roles = project.roles.all()

        member = Member.objects.create(user=self.context)
        member.roles.set(roles)
        project.members.add(member)

        for activity in ['Frontend', 'Backend']:
            ServiceActivity.objects.create(title=activity, project=project)

        return project
