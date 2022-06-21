from django.db import models
from django.contrib.gis.db import models

# Create your models here.


class Hospital(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100, null=True)
    street = models.CharField(max_length=100, null=True)
    state = models.CharField(max_length=100, null=True)
    phone = models.CharField(max_length=20)
    location = models.PointField()
