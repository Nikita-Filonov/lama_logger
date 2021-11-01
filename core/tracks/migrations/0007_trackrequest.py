# Generated by Django 3.2.7 on 2021-10-27 18:37

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('tracks', '0006_auto_20211025_1631'),
    ]

    operations = [
        migrations.CreateModel(
            name='TrackRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('requestId', models.UUIDField(default=uuid.uuid4, verbose_name='Request id')),
                ('method', models.CharField(default='GET', max_length=20, verbose_name='Method')),
                ('requestUrl', models.CharField(max_length=500, verbose_name='Request url')),
                ('requestHeaders', models.JSONField(blank=True, default=list, null=True, verbose_name='Request headers')),
                ('requestBody', models.TextField(blank=True, null=True, verbose_name='Request body')),
                ('statusCode', models.IntegerField(verbose_name='Response status code')),
                ('responseBody', models.TextField(blank=True, null=True, verbose_name='Response body')),
                ('responseHeaders', models.JSONField(blank=True, default=dict, verbose_name='Response headers')),
                ('duration', models.FloatField(blank=True, default=0.0, null=True, verbose_name='Duration in seconds')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tracks.service', verbose_name='Service')),
            ],
        ),
    ]