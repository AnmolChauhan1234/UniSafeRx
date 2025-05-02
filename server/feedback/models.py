from django.db import models
from accounts.models import User

class Feedback(models.Model):
    user        = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    message     = models.TextField()
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback #{self.id}"
