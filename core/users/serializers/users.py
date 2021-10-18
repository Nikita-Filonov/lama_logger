import re

from rest_framework import serializers
from rest_framework.fields import CharField

from core.users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    password2 = CharField(
        label='Confirm Password',
        write_only=True,
        error_messages={
            "blank": "Repeat your password",
            "null": "Repeat your password",
        }
    )

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'password2')

        extra_kwargs = {
            "username": {
                "error_messages": {
                    "max_length": "Username must be between 6 and 70 characters",
                    "min_length": "Username must be between 6 and 70 characters",
                    "blank": "Enter username",
                    "null": "Enter username"
                }
            },
            "email": {
                "error_messages": {
                    "max_length": "Email must be between 8 and 70 characters",
                    "min_length": "Email must be between 8 and 70 characters",
                    "blank": "Enter email address",
                    "null": "Enter email address",
                }
            },
            "password": {
                "error_messages": {
                    "blank": "Enter password",
                    "null": "Enter password",
                }
            }
        }

    def create(self, validated_data):
        validated_data.pop('password2', None)
        return CustomUser.objects.create_user(**validated_data)

    @staticmethod
    def validate_password(password):
        errors = []
        if not re.findall("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$", password):
            errors.append('Use numbers and letters for password')
        if len(password) < 8:
            errors.append('Password must be longer than 8 characters')

        if errors:
            raise serializers.ValidationError(errors)

        return password

    def validate_password2(self, value):
        data = self.get_initial()
        password = data.get('password')
        password2 = value
        if password != password2:
            raise serializers.ValidationError('Password mismatch. Try again')
        return value


class DefaultUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ('staff', 'admin', 'password', 'last_login')
