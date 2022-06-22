from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Report(models.Model): 
    lat = models.FloatField()
    incident_choices = [
        ("SEVERE", "Emergency Case"),
        ("MEDIUM", "Normal"),
        ("LOW", "Low"),
    ]
    long = models.FloatField()
    full_location = models.CharField(max_length=300)
    description = models.TextField()
    title = models.CharField(max_length=200)
    created_by = models.ForeignKey(User , on_delete=models.CASCADE)
    nature_of_incident = models.CharField(choices=incident_choices, max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Attachment(models.Model):
    file_type = models.TextChoices("audio" , ("audio" , "video"))
    from_report = models.ForeignKey("Report" , on_delete=models.CASCADE)
    src = models.FileField(upload_to="attachments/")

    def __str__(self):
        return f"${self.file_type} attachment for Report ${self.from_report.title}"

class Image(models.Model):
    src = models.ImageField(upload_to="images/")
    from_report = models.ForeignKey("Report" , on_delete=models.CASCADE)

