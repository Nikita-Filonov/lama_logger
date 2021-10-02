# Generated by Django 3.2.7 on 2021-10-02 00:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0003_auto_20211001_1812'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='members',
            field=models.ManyToManyField(blank=True, to='projects.Member', verbose_name='Members'),
        ),
        migrations.AlterField(
            model_name='project',
            name='roles',
            field=models.ManyToManyField(blank=True, to='projects.Role', verbose_name='Roles'),
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request_url', models.CharField(max_length=500, verbose_name='Request url')),
                ('request_headers', models.JSONField(blank=True, default=list, verbose_name='Request headers')),
                ('request_body', models.JSONField(blank=True, default=list, verbose_name='Request body')),
                ('response_code', models.IntegerField(verbose_name='Response status code')),
                ('response_body', models.JSONField(blank=True, default=list, verbose_name='Response body')),
                ('response_headers', models.JSONField(blank=True, default=list, verbose_name='Response headers')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='requests',
            field=models.ManyToManyField(blank=True, to='projects.Request', verbose_name='Requests'),
        ),
    ]
