import uuid

from django.db import models
# Create your models here.
from django.utils import timezone

from core.users.models import CustomUser


class Request(models.Model):
    request_id = models.UUIDField(
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
    request_url = models.CharField(
        verbose_name='Request url',
        max_length=500,
        null=False
    )
    request_headers = models.JSONField(
        verbose_name='Request headers',
        default=list,
        blank=True,
        null=True
    )
    request_body = models.TextField(
        verbose_name='Request body',
        blank=True,
        null=True
    )
    response_code = models.IntegerField(
        verbose_name='Response status code'
    )
    response_body = models.TextField(
        verbose_name='Response body',
        blank=True,
        null=True
    )
    response_headers = models.JSONField(
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

    def __str__(self):
        return self.request_url
