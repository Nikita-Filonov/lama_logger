# Generated by Django 3.2.7 on 2021-10-27 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracks', '0008_track_requests'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trackrequest',
            name='duration',
        ),
        migrations.RemoveField(
            model_name='trackrequest',
            name='method',
        ),
        migrations.RemoveField(
            model_name='trackrequest',
            name='requestBody',
        ),
        migrations.RemoveField(
            model_name='trackrequest',
            name='requestHeaders',
        ),
        migrations.RemoveField(
            model_name='trackrequest',
            name='requestUrl',
        ),
        migrations.RemoveField(
            model_name='trackrequest',
            name='responseBody',
        ),
        migrations.RemoveField(
            model_name='trackrequest',
            name='responseHeaders',
        ),
        migrations.RemoveField(
            model_name='trackrequest',
            name='statusCode',
        ),
        migrations.AddField(
            model_name='trackrequest',
            name='additionalInfo',
            field=models.TextField(blank=True, null=True, verbose_name='Additional info'),
        ),
        migrations.AddField(
            model_name='trackrequest',
            name='errorMessage',
            field=models.TextField(blank=True, null=True, verbose_name='Error message'),
        ),
        migrations.AddField(
            model_name='trackrequest',
            name='success',
            field=models.BooleanField(default=True, verbose_name='Is success'),
        ),
    ]