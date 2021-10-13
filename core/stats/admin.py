from django.contrib import admin

# Register your models here.
from core.stats.models import RequestStat

admin.site.register(RequestStat)
