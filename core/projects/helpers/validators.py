from django.core.exceptions import ValidationError
from django.utils import timezone
from django_celery_beat.models import PeriodicTask

from core.projects.helpers.utils import get_interval
from utils.exeptions import BadRequest


def validate_task(task) -> int:
    name = task.get('name')
    if not task.get('task'):
        raise BadRequest('You should provide task')

    if not name:
        raise BadRequest('You should provide name')

    if not task.get('interval'):
        raise BadRequest('You should provide interval')

    interval = get_interval(**task.pop('interval'))

    if PeriodicTask.objects.filter(name=name):
        raise BadRequest(f'Task with name "{name}" already exists')

    try:
        periodic_task = PeriodicTask.objects.create(
            **task,
            interval=interval,
            start_time=timezone.now(),
            enabled=True
        )
    except ValidationError as error:
        raise BadRequest('Error happened while creating task', data=error.error_dict)

    return periodic_task.id
