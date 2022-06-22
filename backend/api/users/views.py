from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from api.response import SuccessResponse , BadRequestResponse

from .serializers import RegisterUserSerializer
from .models import User
from django.contrib.auth import authenticate
# Create your views here.

class LoginView(APIView):
    def post(self , request):
        payload = request.data
        user = authenticate(username=payload.get("email") , password=payload.get("password"))

        if user is not None:
            return SuccessResponse("Login Successfull")
        else:
            return BadRequestResponse("Credentials Mismatched")

class RegisterView(APIView):
    def post(self , request):
        payload = request.data
        try:
            User.objects.get(username=payload.get("email"))
            return BadRequestResponse("User already exists")
        except User.DoesNotExist:
            serializer = RegisterUserSerializer(data=payload)
            if serializer.is_valid():
                serializer.save()
                return SuccessResponse(serializer.data)



