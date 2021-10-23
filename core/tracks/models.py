from django.db import models

# Create your models here.
from core.projects.models import Project


class Track(models.Model):
    endpoint = models.CharField(
        verbose_name='Endpoint',
        max_length=500,
        null=False
    )
    times = models.PositiveIntegerField(
        verbose_name='How many times error should happened',
        default=1
    )
    statusCodes = models.JSONField(
        verbose_name='Status codes',
        default=list,
        blank=False,
        null=False
    )
    responseBodyContains = models.TextField(
        verbose_name='Response body contains',
        null=True,
        blank=True,
    )
    thenAction = models.JSONField(
        verbose_name='Post action when error happened',
        default=list,
        blank=True
    )
    created = models.DateTimeField(
        verbose_name='Created',
        default=timezone.now
    )
    user = models.ForeignKey(
        CustomUser,
        verbose_name='User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    project = models.ForeignKey(
        Project,
        verbose_name='Project',
        on_delete=models.CASCADE,
        null=True
    )
    timesActual = models.PositiveIntegerField(
        verbose_name='How many times error actually happens',
        default=0
    )

    def __str__(self):
        return f'{self.endpoint}:{self.times}'


class Service(models.Model):
    project = models.ForeignKey(
        Project,
        verbose_name='Project',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    title = models.CharField(
        verbose_name='Service title',
        max_length=255,
        null=False
    )
    description = models.TextField(
        verbose_name='Description',
        null=True,
        blank=True
    )
    tracks = models.ManyToManyField(
        Track,
        verbose_name='Tracks'
    )
    index = models.PositiveIntegerField(
        verbose_name='Index on board',
        default=0
    )

    def __str__(self):
        return f'{self.project.title}:{self.title}'
