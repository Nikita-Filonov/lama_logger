from django.db import models
# Create your models here.
from django.utils import timezone

from core.projects.models import Project


class Transaction(models.Model):
    project = models.ForeignKey(
        Project,
        verbose_name='Project',
        on_delete=models.CASCADE
    )
    method = models.CharField(
        verbose_name='Method',
        max_length=20,
        default='GET'
    )
    requestUrl = models.CharField(
        verbose_name='Request url',
        max_length=500,
        null=True,
        blank=True
    )
    statusCode = models.IntegerField(
        verbose_name='Response status code',
        null=True,
        blank=True
    )
    duration = models.FloatField(
        verbose_name='Duration in seconds',
        default=0.0,
        null=True,
        blank=True
    )
    remoteAddress = models.CharField(
        verbose_name='Remote address',
        max_length=40,
        null=True,
        blank=True
    )
    created = models.DateTimeField(
        verbose_name='Created',
        default=timezone.now
    )

    def __str__(self):
        return f'{self.method}:{self.requestUrl}'
