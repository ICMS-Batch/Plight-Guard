from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

from api.response import SuccessResponse , BadRequestResponse

from .serializers import LoginUserSerizer, RegisterUserSerializer
from .models import User
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
    }

class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]

    def get_serializer_context(self):
        context = super(ProfileView, self).get_serializer_context()
        context.update({"request": self.request})
        return context

    def get(self, request, *args, **kwargs):
        print("user" , request.user)
        serializer = LoginUserSerizer(request.user)
        return SuccessResponse( serializer.data)
class LoginView(APIView):
    def post(self , request):
        payload = request.data
        user = authenticate(request ,**payload)
        print("user" , user)

        if user is not None:
            print("user" , user)
            response = get_tokens_for_user(user)
            login(request , user)
            return SuccessResponse(response)
        else:
            return BadRequestResponse("Credentials Mismatched")

class RegisterView(APIView):
    def post(self , request):
        payload = request.data
        try:
            User.objects.get(email=payload.get("email"))
            return BadRequestResponse("User already exists")
        except User.DoesNotExist:
            serializer = RegisterUserSerializer(data=payload)
            if serializer.is_valid():
                serializer.save()
                return SuccessResponse("Registered Successfully")
            else:
                return BadRequestResponse(serializer.errors)



