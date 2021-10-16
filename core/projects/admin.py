from django.contrib import admin

# Register your models here.
from core.projects.models import Project, Member, Role, ProjectSettings

admin.site.register(Project)
admin.site.register(Member)
admin.site.register(Role)
admin.site.register(ProjectSettings)
