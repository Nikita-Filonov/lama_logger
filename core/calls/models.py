import uuid

from django.db import models
# Create your models here.
from django.utils import timezone

from core.projects.models import Project
from core.users.models import CustomUser


class Request(models.Model):
    requestId = models.UUIDField(
        verbose_name='Request id',
        default=uuid.uuid4,
        editable=True,
        unique=True
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
    user = models.ForeignKey(
        CustomUser,
        verbose_name='User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    created = models.DateTimeField(
        verbose_name='Created',
        default=timezone.now
    )
    isCustom = models.BooleanField(
        verbose_name='Is request custom',
        default=False
    )
    project = models.ForeignKey(
        Project,
        verbose_name='Project',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return self.requestUrl


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
