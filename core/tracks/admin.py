from django.contrib import admin

# Register your models here.
from core.tracks.models import Track, Service, ServiceActivity, TrackRequest

admin.site.register(ServiceActivity)
admin.site.register(Service)
admin.site.register(Track)
admin.site.register(TrackRequest)
