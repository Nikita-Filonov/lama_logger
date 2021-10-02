from django.db import models
# Create your models here.
from django.utils import timezone

from users.models import CustomUser


class Role(models.Model):
    SCOPES = [
        'Role.view',
        'Role.create',
        'Role.update',
        'Role.delete'
    ]

    name = models.CharField(
        verbose_name='Role name',
        null=False,
        max_length=255
    )
    scope = models.JSONField(
        verbose_name='Permissions scope',
        default=list,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name


class Member(models.Model):
    SCOPES = [
        'Member.view',
        'Member.create',
        'Member.update',
        'Member.delete'
    ]

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        verbose_name='User'
    )
    role = models.ForeignKey(
        Role,
        on_delete=models.CASCADE,
        verbose_name='User'
    )


class Request(models.Model):
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
    request_body = models.JSONField(
        verbose_name='Request body',
        default=dict,
        blank=True,
        null=True
    )
    response_code = models.IntegerField(
        verbose_name='Response status code'
    )
    response_body = models.JSONField(
        verbose_name='Response body',
        default=list,
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


class Project(models.Model):
    SCOPES = [
        'Project.view',
        'Project.create',
        'Project.update',
        'Project.delete'
    ]

    creator = models.ForeignKey(
        CustomUser,
        verbose_name='Creator',
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    title = models.CharField(
        verbose_name='Title',
        max_length=255,
        null=False
    )
    members = models.ManyToManyField(
        Member,
        verbose_name='Members',
        blank=True
    )
    roles = models.ManyToManyField(
        Role,
        verbose_name='Roles',
        blank=True
    )
    requests = models.ManyToManyField(
        Request,
        verbose_name='Requests',
        blank=True
    )

    def __str__(self):
        return self.title
