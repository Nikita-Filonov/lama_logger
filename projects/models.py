from django.db import models


# Create your models here.


class Project(models.Model):
    title = models.CharField(
        verbose_name='Title',
        max_length=255,
        null=False
    )

    def __str__(self):
        return self.title
