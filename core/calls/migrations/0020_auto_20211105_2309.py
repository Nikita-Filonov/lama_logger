# Generated by Django 3.2.7 on 2021-11-05 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calls', '0019_customrequestshistory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='requestUrl',
            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='Request url'),
        ),
        migrations.AlterField(
            model_name='request',
            name='statusCode',
            field=models.IntegerField(blank=True, null=True, verbose_name='Response status code'),
        ),
    ]