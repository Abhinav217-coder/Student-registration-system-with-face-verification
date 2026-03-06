from django.db import models
from django.contrib.auth.models import User

class Verification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.BooleanField()
    confidence = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {'Success' if self.status else 'Failed'} - {self.attempted_at}"
