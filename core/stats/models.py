from django.db import models
# Create your models here.
from django.utils import timezone

from core.projects.models import Project


class RequestStat(models.Model):
    ACTIONS = (
        ('create', 'create'),
        ('delete', 'delete'),
        ('filter', 'filter')
    )
    statusCode = models.PositiveIntegerField(
        verbose_name='Status code',
        null=False
    )
    method = models.CharField(
        verbose_name='Method',
        null=False,
        max_length=20
    )
    created = models.DateTimeField(
        verbose_name='Created',
        default=timezone.now
    )
    action = models.CharField(
        verbose_name='Action',
        default='create',
        choices=ACTIONS,
        max_length=10
    )
    project = models.ForeignKey(
        Project,
        verbose_name='Project',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.method}: {self.created.strftime("%b %d %Y %H:%M:%S")}'
