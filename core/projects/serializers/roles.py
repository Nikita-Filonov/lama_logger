from rest_framework import serializers

from core.projects.models import Role


class RolesSerializer(serializers.ModelSerializer):
    scopesCount = serializers.SerializerMethodField('get_scopes_count')

    class Meta:
        model = Role
        fields = '__all__'

    @staticmethod
    def get_scopes_count(obj: Role):
        return len(obj.scope)


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'
