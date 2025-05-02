from django.db import models
from medicine.models import Medicine
from accounts.models import User

class GeoLog(models.Model):
    medicine    = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name="geo_logs")
    timestamp   = models.DateTimeField()
    geolocation = models.CharField(max_length=200)
    scanned_by  = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

class ScanEvent(models.Model):
    ROLE_CHOICES = [
        ('wholesaler', 'Wholesaler'),
        ('retailer', 'Retailer'),
        ('consumer', 'Consumer'),
    ]

    medicine    = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name="scan_events")
    user        = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    role        = models.CharField(max_length=20, choices=ROLE_CHOICES)
    timestamp   = models.DateTimeField(auto_now_add=True)
    geolocation = models.CharField(max_length=200)
    image_urls  = models.JSONField(default=list, blank=True)
    result      = models.CharField(
        max_length=20,
        choices=[('pending','Pending'),('real','Real'),('fake','Fake'),('uncertain','Uncertain')],
        default='pending'
    )

    def __str__(self):
        return f"{self.role.title()} scan of {self.medicine.barcode} @ {self.timestamp}"
