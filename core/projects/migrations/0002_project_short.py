# Generated by Django 3.2.7 on 2021-10-16 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='short',
            field=models.CharField(blank=True, max_length=10, null=True, verbose_name='Short name'),
        ),
    ]
