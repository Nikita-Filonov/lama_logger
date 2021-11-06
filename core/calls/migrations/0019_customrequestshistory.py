# Generated by Django 3.2.7 on 2021-11-05 10:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('calls', '0018_requestsfilter_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomRequestsHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Created')),
                ('method', models.CharField(default='GET', max_length=20, verbose_name='Method')),
                ('requestUrl', models.CharField(max_length=500, verbose_name='Request url')),
                ('requestBody', models.TextField(blank=True, null=True, verbose_name='Request body')),
                ('requestHeaders', models.JSONField(blank=True, default=list, null=True, verbose_name='Request headers')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
        ),
    ]