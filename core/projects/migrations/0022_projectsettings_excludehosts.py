# Generated by Django 3.2.7 on 2021-11-19 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0021_projectsettings_trackdomains'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectsettings',
            name='excludeHosts',
            field=models.JSONField(blank=True, default=['localhost', 'docker.host.internal', '127.0.0.1'], verbose_name='Exclude hosts'),
        ),
    ]
