# Generated by Django 3.2.7 on 2021-10-09 10:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0011_project_archived'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='members',
        ),
        migrations.AddField(
            model_name='member',
            name='project',
            field=models.ForeignKey(default=70, on_delete=django.db.models.deletion.CASCADE, to='projects.project', verbose_name='Project'),
            preserve_default=False,
        ),
    ]
