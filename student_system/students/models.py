from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    email = models.EmailField(null=True, blank=True) 
    profile_photo = models.ImageField(upload_to='profile_photos/')
    face_encoding = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.email
