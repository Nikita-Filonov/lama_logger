# Generated by Django 3.2.7 on 2021-11-18 15:35

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('calls', '0026_auto_20211114_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='nodeId',
            field=models.UUIDField(default=uuid.uuid4, null=True, verbose_name='Node id'),
        ),
    ]
