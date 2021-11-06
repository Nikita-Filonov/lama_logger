from django.contrib import admin

# Register your models here.
from core.users.models import CustomUser, ApiToken, UserSettings

admin.site.register(CustomUser)
admin.site.register(ApiToken)
admin.site.register(UserSettings)
