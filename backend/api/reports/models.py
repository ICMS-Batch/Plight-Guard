from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Report(models.Model): 
    lat = models.CharField(max_length=200)
    nature_of_complaint= [
        ("EMERGENCY", "Emergency Case"),
        ("NORMAL", "Normal Case"),
    ]
    long = models.CharField(max_length=200)
    full_location = models.CharField(max_length=300)
    description = models.TextField()
    title = models.CharField(max_length=200)
    created_by = models.ForeignKey(User , on_delete=models.CASCADE, null=True)
    nature_of_incident = models.CharField(choices=nature_of_complaint, max_length=40)
    title = models.CharField(max_length=200)
    category = models.ForeignKey("Category" , on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Attachment(models.Model):
    from_report = models.ForeignKey("Report" , on_delete=models.CASCADE)
    src = models.FileField(upload_to="attachments/")

    def __str__(self):
        return f"Attachment for Report ${self.from_report.title}"

class Image(models.Model):
    src = models.ImageField(upload_to="images/")
    from_report = models.ForeignKey("Report" , on_delete=models.CASCADE)


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
