from rest_framework import serializers
from .models import Report, User
class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"

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