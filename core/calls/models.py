import uuid

from django.db import models
# Create your models here.
from django.utils import timezone

from core.projects.models import Project
from core.users.models import CustomUser


class Request(models.Model):
    SCOPES = [
        'Request.View',
        'Request.Create',
        'Request.Update',
        'Request.Delete'
    ]

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
        null=True,
        blank=True
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
    queryParams = models.JSONField(
        verbose_name='Query params',
        default=list,
        blank=True,
        null=True
    )
    statusCode = models.IntegerField(
        verbose_name='Response status code',
        null=True,
        blank=True
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
    node = models.CharField(
        verbose_name='Node name',
        null=True,
        blank=True,
        max_length=255
    )
    nodeId = models.UUIDField(
        verbose_name='Node id',
        default=uuid.uuid4,
        editable=True,
        unique=False,
        null=True
    )

    def __str__(self):
        return self.requestUrl or 'No url'


class CustomRequestsHistory(models.Model):
    user = models.ForeignKey(
        CustomUser,
        verbose_name='User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    requestId = models.UUIDField(
        verbose_name='Request id',
        default=uuid.uuid4,
        editable=True,
        unique=False,
        help_text='Same as requestId in "Requests" model. This requestId not unique'
    )
    created = models.DateTimeField(
        verbose_name='Created',
        default=timezone.now
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
    requestBody = models.TextField(
        verbose_name='Request body',
        blank=True,
        null=True
    )
    requestHeaders = models.JSONField(
        verbose_name='Request headers',
        default=list,
        blank=True,
        null=True
    )
    queryParams = models.JSONField(
        verbose_name='Query params',
        default=list,
        blank=True,
        null=True
    )
    project = models.ForeignKey(
        Project,
        verbose_name='Project',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f'{self.user.email}:{self.requestUrl}'


class RequestsFilter(models.Model):
    SCOPES = [
        'RequestsFilter.View',
        'RequestsFilter.Create',
        'RequestsFilter.Update',
        'RequestsFilter.Delete'
    ]
    project = models.ForeignKey(
        Project,
        verbose_name='Project',
        on_delete=models.CASCADE,
        null=True
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
    title = models.CharField(
        verbose_name='Title',
        max_length=255
    )
    body = models.JSONField(
        verbose_name='Body',
        default=dict
    )
    domain = models.CharField(
        verbose_name='Domain',
        null=True,
        blank=True,
        max_length=500
    )
    headers = models.JSONField(
        verbose_name='Headers',
        default=list,
        blank=True
    )
    methods = models.JSONField(
        verbose_name='Methods',
        default=list,
        blank=True
    )
    statusCodes = models.JSONField(
        verbose_name='Status codes',
        default=dict,
        blank=True
    )
    time = models.JSONField(
        verbose_name='Time',
        default=dict,
        blank=True
    )

    def __str__(self):
        return f'{self.project.title}:{self.title}'
