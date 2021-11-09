# Generated by Django 3.2.7 on 2021-11-09 16:43

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('calls', '0024_alter_customrequestshistory_requestid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customrequestshistory',
            name='requestId',
            field=models.UUIDField(default=uuid.uuid4, help_text='Same as requestId in "Requests" model. This requestId not unique', verbose_name='Request id'),
        ),
    ]
