# Generated by Django 3.2.7 on 2021-10-16 10:17

import django.core.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=70, null=True, validators=[django.core.validators.MinLengthValidator(6)], verbose_name='Username')),
                ('email', models.EmailField(error_messages={'unique': 'User with such email already exists.'}, max_length=70, null=True, unique=True, validators=[django.core.validators.MinLengthValidator(8)], verbose_name='Email')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created at')),
                ('active', models.BooleanField(default=True)),
                ('staff', models.BooleanField(default=False)),
                ('admin', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
