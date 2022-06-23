from rest_framework.views import APIView

from api.response import SuccessResponse , BadRequestResponse

from .serializers import RegisterUserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
    }


class LoginView(APIView):
    def post(self , request):
        payload = request.data
        user = authenticate(username=payload.get("email") , password=payload.get("password"))

        if user is not None:
            response = get_tokens_for_user(user)
            return SuccessResponse(response)
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
                return SuccessResponse("Registered Successfully")
            else:
                return BadRequestResponse(serializer.errors)



