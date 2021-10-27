import uuid

from django.db import models
# Create your models here.
from django.utils import timezone

from core.projects.models import Project
from core.users.models import CustomUser


class TrackRequest(models.Model):
    service = models.ForeignKey(
        'tracks.Service',
        verbose_name='Service',
        on_delete=models.CASCADE,
    )
    requestId = models.UUIDField(
        verbose_name='Request id',
        default=uuid.uuid4,
        editable=True,
    )
    method = models.CharField(
        verbose_name='Method',
        max_length=20,
        default='GET'
    )
    requestUrl = models.CharField(
        verbose_name='Request url',
        max_length=500,
        null=False
    )
    requestHeaders = models.JSONField(
        verbose_name='Request headers',
        default=list,
        blank=True,
        null=True
    )
    requestBody = models.TextField(
        verbose_name='Request body',
        blank=True,
        null=True
    )
    statusCode = models.IntegerField(
        verbose_name='Response status code'
    )
    responseBody = models.TextField(
        verbose_name='Response body',
        blank=True,
        null=True
    )
    responseHeaders = models.JSONField(
        verbose_name='Response headers',
        default=dict,
        blank=True
    )
    duration = models.FloatField(
        verbose_name='Duration in seconds',
        default=0.0,
        null=True,
        blank=True
    )
    created = models.DateTimeField(
        verbose_name='Created',
        default=timezone.now
    )

    def __str__(self):
        return self.requestUrl


class Track(models.Model):
    requests = models.ManyToManyField(
        TrackRequest,
        verbose_name='Requests',
    )
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
    timesActual = models.PositiveIntegerField(
        verbose_name='How many times error actually happens',
        default=0
    )

    def __str__(self):
        return f'{self.endpoint}:{self.times}'


class Service(models.Model):
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
        verbose_name='Tracks',
        null=True,
        blank=True
    )
    index = models.PositiveIntegerField(
        verbose_name='Index on board',
        default=0
    )
    created = models.DateTimeField(
        verbose_name='Created',
        default=timezone.now
    )

    def __str__(self):
        return f'{self.title}'


class ServiceActivity(models.Model):
    title = models.CharField(
        verbose_name='Title',
        max_length=255,
        null=False
    )
    project = models.ForeignKey(
        Project,
        verbose_name='Project',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    services = models.ManyToManyField(
        Service,
        verbose_name='Services',
        blank=True
    )
    created = models.DateTimeField(
        verbose_name='Created',
        default=timezone.now
    )
    index = models.PositiveIntegerField(
        verbose_name='Index',
        default=0
    )

    def __str__(self):
        return f'{self.title}'
