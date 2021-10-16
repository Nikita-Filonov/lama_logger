from rest_framework import serializers

from core.projects.models import ProjectSettings


class ProjectSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectSettings
        exclude = ('project',)


class ProjectSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectSettings
        fields = '__all__'
