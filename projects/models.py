from django.db import models

# Create your models here.
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
        verbose_name='Members'
    )
    roles = models.ManyToManyField(
        Role,
        verbose_name='Roles'
    )

    def __str__(self):
        return self.title
