# Generated by Django 3.2.7 on 2021-10-17 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calls', '0005_customrequest'),
    ]

    operations = [
        migrations.CreateModel(
            name='RequestTracks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('endpoint', models.CharField(max_length=500, verbose_name='Endpoint')),
                ('times', models.PositiveIntegerField(verbose_name='How many times error should happened')),
                ('statusCode', models.PositiveIntegerField(verbose_name='Status code')),
                ('responseBodyContains', models.CharField(blank=True, max_length=255, null=True, verbose_name='Response body contains')),
                ('thenAction', models.JSONField(blank=True, default=list, verbose_name='Post action when error happened')),
            ],
        ),
    ]
