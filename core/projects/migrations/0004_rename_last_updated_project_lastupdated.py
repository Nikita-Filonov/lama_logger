# Generated by Django 3.2.7 on 2021-10-16 15:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_auto_20211016_1500'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='last_updated',
            new_name='lastUpdated',
        ),
    ]
