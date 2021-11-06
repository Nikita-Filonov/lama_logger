from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.core.validators import MinLengthValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from core.users.helpers.dumps import JSON_EDITOR


class UserManager(BaseUserManager):
    def create_user(self, **kwargs):
        """
        Creates and saves a User with the given email and password.
        """

        user = self.model(**kwargs)

        user.set_password(kwargs['password'])
        user.save(using=self._db)
        return user

    def create_staffuser(self, username, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            username=username,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            username='admin',
            email=email,
            password=password,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    JOBS = (
        ('developer', 'developer'),
        ('quality assurance', 'quality assurance'),
        ('team lead', 'team lead'),
        ('product manager', 'product manager')
    )
    objects = UserManager()

    username = models.CharField(
        verbose_name='Username',
        max_length=70,
        null=True,
        unique=False,
        validators=[MinLengthValidator(6)]
    )
    email = models.EmailField(
        verbose_name='Email',
        max_length=70,
        unique=True,
        validators=[MinLengthValidator(8)],
        error_messages={
            'unique': "User with such email already exists.",
        }
    )
    job = models.CharField(
        verbose_name='Job title',
        max_length=100,
        null=True,
        blank=True,
        choices=JOBS
    )
    telegram_id = models.BigIntegerField(
        verbose_name='User telegram id',
        null=True,
        blank=True,
    )
    telegram_username = models.CharField(
        verbose_name='User telegram username',
        null=True,
        blank=True,
        max_length=255
    )
    created = models.DateTimeField(
        verbose_name='Created at',
        default=timezone.now,
        null=False
    )
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)  # a admin user; non super-user
    admin = models.BooleanField(default=False)  # a superuser
    # notice the absence of a "Password field", that is built in.

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        # The user is identified by their email address
        return self.username

    def get_short_name(self):
        # The user is identified by their email address
        return self.username

    def __str__(self):  # __unicode__ on Python 2
        return self.username or self.email

    def has_perm(self, perm, obj=None):
        """Does the user have a specific permission?"""
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        """Does the user have permissions to view the app `app_label`?"""
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        """Is the user a member of staff?"""
        return self.staff

    @property
    def is_admin(self):
        """Is the user a admin member?"""
        return self.admin

    @property
    def is_active(self):
        """Is the user active?"""
        return self.active


class ApiToken(models.Model):
    user = models.ForeignKey(
        CustomUser,
        verbose_name='User',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    name = models.CharField(
        verbose_name='Token name',
        null=False,
        max_length=255
    )
    token = models.UUIDField(
        verbose_name='Token',
        editable=True,
        unique=True,
        null=False
    )
    created = models.DateTimeField(
        verbose_name='Created',
        default=timezone.now
    )
    deleted = models.BooleanField(
        verbose_name='Deleted',
        default=False
    )

    def __str__(self):
        return f'{self.user.email}:{self.name}'


class UserSettings(models.Model):
    user = models.ForeignKey(
        CustomUser,
        verbose_name='User',
        on_delete=models.CASCADE,
    )
    jsonEditor = models.JSONField(
        verbose_name='Json editor',
        blank=False,
        null=False,
        default=dict
    )

    def __str__(self):
        return self.user.email


@receiver(post_save, sender=CustomUser)
def on_project_create(sender, instance, **kwargs):
    user = CustomUser.objects.filter(user=instance)
    if not user:
        UserSettings.objects.create(user=instance, jsonEditor=JSON_EDITOR)
