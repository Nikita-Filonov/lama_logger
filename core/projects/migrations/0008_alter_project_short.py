# Generated by Django 3.2.7 on 2021-10-17 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0007_remove_project_requests'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='short',
            field=models.CharField(blank=True, max_length=2, null=True, verbose_name='Short name'),
        ),
    ]
