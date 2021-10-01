from rest_framework import serializers

from users.models import CustomUser


class DefaultUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ('staff', 'admin', 'password', 'last_login')
