from rest_framework import serializers

from .models import Attachment, Category, Image, Municipality, Report

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image 
        fields = "__all__"
class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment 
        fields = "__all__"

class MunicipalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipality 
        fields = "__all__"

class ReportListingSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Report
        fields = "__all__"

class ReportCategorySerialzier(serializers.ModelSerializer):
    class Meta:
        model = Category 
        fields = "__all__"

class CreateReportSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Report
        fields = ("lat" , "long" , "full_location" , "description", "created_by" , "title" , "nature_of_incident" , "category" , "municipality")
    
    def create(self, validated_data):
        files = self.context.get("files")
        print("files" , files)
        attachments = files.getlist("attachments")
        images = files.getlist("images")
        new_report = Report.objects.create(**validated_data)
        for attachment in attachments:
            Attachment.objects.create(from_report=new_report, src=attachment)
        
        for image in images:
            Image.objects.create(src=image, from_report=new_report)

        return new_report

    


