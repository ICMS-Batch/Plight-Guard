from rest_framework.generics import ListAPIView , CreateAPIView
from .models import  Category, Report
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from .serializers import CreateReportSerializer, ReportCategorySerialzier , ReportListingSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from api.response import SuccessResponse , BadRequestResponse

# Create your views here.

class ReportListingView(ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListingSerializer
    pagination_class = PageNumberPagination


class ReportCategoryListingView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = ReportCategorySerialzier



class CreateReportView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateReportSerializer
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = CreateReportSerializer(data=data, context={"files": request.FILES})
        if serializer.is_valid():
            serializer.save()
            return SuccessResponse(serializer.data)
        return BadRequestResponse(serializer.errors)

