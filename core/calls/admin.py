from django.contrib import admin

# Register your models here.
from core.calls.models import Request, RequestsFilter, CustomRequestsHistory

admin.site.register(Request)
admin.site.register(RequestsFilter)
admin.site.register(CustomRequestsHistory)
