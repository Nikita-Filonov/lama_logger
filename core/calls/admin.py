from django.contrib import admin

# Register your models here.
from core.calls.models import Request

admin.site.register(Request)
