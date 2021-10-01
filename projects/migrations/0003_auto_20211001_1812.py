# Generated by Django 3.2.7 on 2021-10-01 18:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0002_auto_20211001_1759'),
    ]

    operations = [
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Role name')),
                ('scope', models.JSONField(blank=True, default=list, null=True, verbose_name='Permissions scope')),
            ],
        ),
        migrations.RemoveField(
            model_name='member',
            name='scope',
        ),
        migrations.AddField(
            model_name='project',
            name='creator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Creator'),
        ),
        migrations.AddField(
            model_name='member',
            name='role',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='projects.role', verbose_name='User'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='roles',
            field=models.ManyToManyField(to='projects.Role', verbose_name='Roles'),
        ),
    ]
