from django.contrib import admin 
from .models import Report , Category , Municipality, Attachment , Image


# Register your models here.
admin.site.register(Report)
admin.site.register(Category)
admin.site.register(Image)
admin.site.register(Attachment)
admin.site.register(Municipality)

