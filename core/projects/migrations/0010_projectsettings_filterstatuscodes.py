# Generated by Django 3.2.7 on 2021-10-20 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0009_alter_project_short'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectsettings',
            name='filterStatusCodes',
            field=models.JSONField(blank=True, default={'error': [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 418, 422, 423, 424, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511], 'redirect': [300, 301, 302, 303, 304, 305, 306, 307, 308], 'success': [100, 101, 200, 201, 202, 203, 204, 205, 206, 208, 226]}, verbose_name='Filter status codes'),
        ),
    ]