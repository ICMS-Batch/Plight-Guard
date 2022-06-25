from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView , CreateAPIView
from .models import  Attachment, Category, Image, Municipality, Report
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from .serializers import AttachmentSerializer, CreateReportSerializer, ImageSerializer, MunicipalitySerializer, ReportCategorySerialzier , ReportListingSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from api.response import SuccessResponse , BadRequestResponse

# Create your views here.



class ReportListingView(ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListingSerializer
    pagination_class = PageNumberPagination

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class ReportCategoryListingView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = ReportCategorySerialzier

class SingleReportViewById(ListAPIView):
    queryset = None
    serializer_class = ReportListingSerializer 

    def get(self, request, id=None, *args, **kwargs):
        self.queryset = get_object_or_404(Report, pk=id)
        report = self.queryset
        images = Image.objects.filter(from_report__id=report.id)
        image_serializer = ImageSerializer(instance=images , many=True)
        attachments = Attachment.objects.filter(from_report__id=report.id)
        attachment_serializer = AttachmentSerializer(instance=attachments , many=True)
        serializer = ReportListingSerializer(report)
        response = serializer.data
        response.update({ "images":image_serializer.data , "attachments":attachment_serializer.data})
        return SuccessResponse(response)

class MunicipalitiesView(ListAPIView):
    queryset = Municipality.objects.all()
    serializer_class = MunicipalitySerializer

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

