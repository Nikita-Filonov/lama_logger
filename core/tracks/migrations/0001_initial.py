# Generated by Django 3.2.7 on 2021-10-23 18:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('projects', '0012_remove_projectsettings_realtimeupdates'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Service title')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Description')),
                ('index', models.PositiveIntegerField(default=0, verbose_name='Index on board')),
            ],
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('endpoint', models.CharField(max_length=500, verbose_name='Endpoint')),
                ('times', models.PositiveIntegerField(default=1, verbose_name='How many times error should happened')),
                ('statusCodes', models.JSONField(default=list, verbose_name='Status codes')),
                ('responseBodyContains', models.TextField(blank=True, null=True, verbose_name='Response body contains')),
                ('thenAction', models.JSONField(blank=True, default=list, verbose_name='Post action when error happened')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created')),
                ('timesActual', models.PositiveIntegerField(default=0, verbose_name='How many times error actually happens')),
                ('project', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.project', verbose_name='Project')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
        ),
        migrations.CreateModel(
            name='ServiceActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='projects.project', verbose_name='Project')),
                ('services', models.ManyToManyField(to='tracks.Service', verbose_name='Services')),
            ],
        ),
        migrations.AddField(
            model_name='service',
            name='tracks',
            field=models.ManyToManyField(to='tracks.Track', verbose_name='Tracks'),
        ),
    ]
