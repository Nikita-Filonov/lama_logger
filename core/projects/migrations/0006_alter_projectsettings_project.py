# Generated by Django 3.2.7 on 2021-10-16 18:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_auto_20211016_1626'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectsettings',
            name='project',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='projects.project', verbose_name='Project'),
        ),
    ]