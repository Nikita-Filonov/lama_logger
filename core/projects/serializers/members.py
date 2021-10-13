from rest_framework import serializers

from core.projects.models import Member
from core.projects.serializers.roles import RolesSerializer
from core.users.serializers.users import DefaultUserSerializer


class MembersSerializer(serializers.ModelSerializer):
    user = DefaultUserSerializer(many=False, read_only=True)
    roles = RolesSerializer(many=True, read_only=True)

    class Meta:
        model = Member
        fields = '__all__'


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'
