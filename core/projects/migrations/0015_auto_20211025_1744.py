# Generated by Django 3.2.7 on 2021-10-25 17:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0014_project_slack_channel'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='slack_channel',
            new_name='slackChannel',
        ),
        migrations.RenameField(
            model_name='project',
            old_name='telegram_channel',
            new_name='telegramChannel',
        ),
        migrations.RenameField(
            model_name='project',
            old_name='telegram_channel_id',
            new_name='telegramChannelId',
        ),
    ]