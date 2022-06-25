from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser , BaseUserManager, PermissionsMixin
class Municipality(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.name

class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, full_name, password,municipality, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')
        return self.create_user(email,  full_name, password,municipality, **other_fields)

    def create_user(self, email, full_name, password,municipality_id, **other_fields):
        email = self.normalize_email(email)
        municipality = Municipality.objects.get(pk=municipality_id)
        user = self.model(email=email, full_name=full_name,password=password,municipality=municipality, **other_fields)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    REQUIRED_FIELDS = ["full_name", "password", "municipality"]
    municipality = models.ForeignKey(Municipality , on_delete=models.CASCADE , null=True)
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    objects = CustomAccountManager()
    USERNAME_FIELD = "email"
    EMAIL_FIELD = 'email'

    def __str__(self):
        return self.full_name

    # def __str__(self):
    #     return self.first_name + " " + self.last_name