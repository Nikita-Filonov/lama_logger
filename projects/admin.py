from django.contrib import admin

# Register your models here.
from projects.models import Project, Member, Role, Request

admin.site.register(Project)
admin.site.register(Member)
admin.site.register(Role)
admin.site.register(Request)
