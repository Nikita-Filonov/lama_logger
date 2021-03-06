# Generated by Django 3.2.7 on 2021-11-21 15:16

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('projects', '0024_auto_20211120_0111'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('method', models.CharField(default='GET', max_length=20, verbose_name='Method')),
                ('requestUrl', models.CharField(blank=True, max_length=500, null=True, verbose_name='Request url')),
                ('statusCode', models.IntegerField(blank=True, null=True, verbose_name='Response status code')),
                ('duration', models.FloatField(blank=True, default=0.0, null=True, verbose_name='Duration in seconds')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.project', verbose_name='Project')),
            ],
        ),
    ]
