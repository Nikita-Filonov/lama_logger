from django.contrib import admin

# Register your models here.
from core.calls.models import Request, Track

admin.site.register(Request)
admin.site.register(Track)
