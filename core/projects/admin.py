from django.contrib import admin

# Register your models here.
from core.projects.models import Project, Member, Role, ProjectSettings, ProjectTask, ProjectAction

admin.site.register(Project)
admin.site.register(Member)
admin.site.register(Role)
admin.site.register(ProjectTask)
admin.site.register(ProjectSettings)
admin.site.register(ProjectAction)
