# Generated by Django 3.2.7 on 2021-11-04 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0020_alter_projectsettings_trackpatterns'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectsettings',
            name='trackDomains',
            field=models.JSONField(blank=True, default=list, verbose_name='Track domains'),
        ),
    ]
