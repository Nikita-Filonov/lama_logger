# Generated by Django 3.2.7 on 2021-11-14 09:49

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('calls', '0025_alter_customrequestshistory_requestid'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='node',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Node name'),
        ),
        migrations.AddField(
            model_name='request',
            name='nodeId',
            field=models.UUIDField(default=uuid.uuid4, verbose_name='Node id'),
        ),
    ]
