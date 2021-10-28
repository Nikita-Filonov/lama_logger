from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from core.projects.helpers.dumps import DEFAULT_METHODS, DEFAULT_STATUS_CODES
from core.users.models import CustomUser


# Create your models here.


class Role(models.Model):
    SCOPES = [
        'Role.View',
        'Role.Create',
        'Role.Update',
        'Role.Delete'
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
    description = models.TextField(
        verbose_name='Description',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name


class Member(models.Model):
    SCOPES = [
        'Member.View',
        'Member.Create',
        'Member.Update',
        'Member.Delete'
    ]

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        verbose_name='User'
    )
    roles = models.ManyToManyField(
        Role,
        verbose_name='Roles'
    )

    def __str__(self):
        return f'{self.id} {self.user.email}'


class Project(models.Model):
    SCOPES = [
        'Project.View',
        'Project.Create',
        'Project.Update',
        'Project.Delete'
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
    description = models.TextField(
        verbose_name='Description',
        null=True,
        blank=True
    )
    short = models.CharField(
        verbose_name='Short name',
        max_length=2,
        null=False,
        blank=False
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
    archived = models.BooleanField(
        verbose_name='Archived',
        default=False
    )
    created = models.DateTimeField(
        verbose_name='Created',
        default=timezone.now
    )
    lastUpdated = models.DateTimeField(
        verbose_name='Last updated',
        auto_now=True
    )
    telegramChannel = models.CharField(
        verbose_name='Telegram channel',
        null=True,
        blank=True,
        max_length=255
    )
    telegramChannelId = models.BigIntegerField(
        verbose_name='Telegram channel id',
        null=True,
        blank=True,
    )
    slackChannel = models.CharField(
        verbose_name='Slack channel',
        null=True,
        blank=True,
        max_length=255
    )

    def __str__(self):
        return self.title


class ProjectSettings(models.Model):
    project = models.OneToOneField(
        Project,
        verbose_name='Project',
        on_delete=models.CASCADE
    )
    filterMethods = models.JSONField(
        verbose_name='Filter methods',
        default=DEFAULT_METHODS,
        blank=True
    )
    filterStatusCodes = models.JSONField(
        verbose_name='Filter status codes',
        blank=True,
        default=DEFAULT_STATUS_CODES
    )
    filterHeaders = models.JSONField(
        verbose_name='Filter headers',
        blank=True,
        default=None
    )
    excludeMethods = models.JSONField(
        verbose_name='Exclude methods',
        default=list,
        blank=True
    )
    excludeStatuses = models.JSONField(
        verbose_name='Exclude statuses',
        default=list,
        blank=True
    )

    def __str__(self):
        return self.project.title


@receiver(post_save, sender=Project)
def on_project_create(sender, instance, **kwargs):
    settings = ProjectSettings.objects.filter(project=instance)
    if not settings:
        ProjectSettings.objects.create(project=instance)
