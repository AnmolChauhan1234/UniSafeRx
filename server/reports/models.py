from django.db import models
from medicine.models import Medicine
from accounts.models import User

class Report(models.Model):
    reporter     = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    medicine     = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    reason       = models.TextField()
    image_url    = models.URLField(max_length=500, blank=True, null=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report by {self.reporter} on {self.medicine.barcode}"
