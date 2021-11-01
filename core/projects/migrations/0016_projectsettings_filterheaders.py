# Generated by Django 3.2.7 on 2021-10-28 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0015_auto_20211025_1744'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectsettings',
            name='filterHeaders',
            field=models.JSONField(blank=True, default={'keys': ['Content-Type', 'Authorization', 'Accept', 'User-Agent', 'Host'], 'values': ['application/json', 'application/javascript', 'application/zip', 'application/gzip', 'application/xml', 'image/png', 'image/jpeg', 'multipart/form-data', 'text/html', 'text/javascript', 'Token <value>', 'Bearer <value>']}, verbose_name='Filter headers'),
        ),
    ]