from rest_framework import serializers
from django.contrib.auth.models import User

class LoginUserSerizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("full_name" , "email")

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name" , "email" , "password", "last_name", "username")
    
    def create(self, validated_data):
        new_user = User.objects.create_user(**validated_data)
        return new_user