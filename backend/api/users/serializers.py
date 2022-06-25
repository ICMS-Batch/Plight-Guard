from rest_framework import serializers
from .models import User

class LoginUserSerizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("full_name" , "email")

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("full_name" , "email", "id", "municipality", "password")
    
    def create(self, validated_data):
        new_user = User.objects.create(**validated_data)
        # new_user = User.objects.create_user(**validated_data, municipality_id=validated_data.get("municipality").id)
        return new_user