# Generated by Django 3.2.7 on 2021-10-17 09:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calls', '0006_requesttracks'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='isCustom',
            field=models.BooleanField(default=False, verbose_name='Is request custom'),
        ),
        migrations.DeleteModel(
            name='CustomRequest',
        ),
    ]
