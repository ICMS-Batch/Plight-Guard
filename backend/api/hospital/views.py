# from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Hospital

from .utils import get_hospitals_with_numbers

# Create your views here.


class CloseHospitalByLocationView(APIView):
    def get(self, request):
        hospitals = get_hospitals_with_numbers()

        for hospital in hospitals:
            tags = hospital["tags"]
            name = tags.get("name")
            city = tags.get("addr:city")
            street = tags.get("addr:street")
            state = tags.get("addr:state")
            phone = tags.get("phone")
            Hospital.objects.create(
                name=name, city=city, street=street, state=state, phone=phone)
        return Response("updating")
