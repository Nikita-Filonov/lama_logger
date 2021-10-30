from django.utils.functional import empty
from django_celery_beat.models import PeriodicTask, IntervalSchedule
from rest_framework import serializers

from core.projects.helpers.validators import validate_create_task, validate_update_task
from core.projects.models import ProjectTask

TASK_VALIDATORS = {
    'POST': validate_create_task,
    'PATCH': validate_update_task
}


class IntervalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntervalSchedule
        fields = '__all__'


class TasksSerializer(serializers.ModelSerializer):
    interval = IntervalsSerializer(many=False, read_only=True)

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
            data['task'] = TASK_VALIDATORS[self.context['request'].method](task)

        value = super().run_validation(data)
        return value

    def create(self, validated_data):
        project = self.context['project']
        return ProjectTask.objects.create(project=project, **validated_data)
