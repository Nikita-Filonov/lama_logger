from django.utils.functional import empty
from django_celery_beat.models import PeriodicTask
from rest_framework import serializers

from core.projects.helpers.validators import validate_task
from core.projects.models import ProjectTask


class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodicTask
        exclude = ('crontab', 'solar', 'clocked', 'priority', 'routing_key', 'args', 'queue', 'one_off')


class ProjectTasksSerializer(serializers.ModelSerializer):
    task = TasksSerializer(many=False, read_only=True)

    class Meta:
        model = ProjectTask
        exclude = ('project',)


class ProjectTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTask
        fields = '__all__'

    def run_validation(self, data=empty):
        task = data.get('task', None)

        if task:
            data['task'] = validate_task(task)

        value = super().run_validation(data)
        return value

    def create(self, validated_data):
        project = self.context['project']
        return ProjectTask.objects.create(project=project, **validated_data)
