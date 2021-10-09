from rest_framework import serializers

from projects.models import Role


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'
