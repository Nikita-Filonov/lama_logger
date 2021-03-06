# Generated by Django 3.2.7 on 2021-10-18 15:35

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_customuser_job'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(error_messages={'unique': 'User with such email already exists.'}, max_length=70, unique=True, validators=[django.core.validators.MinLengthValidator(8)], verbose_name='Email'),
        ),
    ]
