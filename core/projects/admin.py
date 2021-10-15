from django.contrib import admin

# Register your models here.
from core.projects.models import Project, Member, Role, Request, ProjectSettings

admin.site.register(Project)
admin.site.register(Member)
admin.site.register(Role)
admin.site.register(Request)
admin.site.register(ProjectSettings)
