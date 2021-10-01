from django.contrib import admin

# Register your models here.
from projects.models import Project, Member, Role

admin.site.register(Project)
admin.site.register(Member)
admin.site.register(Role)
