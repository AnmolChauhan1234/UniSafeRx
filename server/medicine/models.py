# from django.db import models

# class Medicine(models.Model):
#     name = models.CharField(max_length=200)
#     brand = models.CharField(max_length=200)
#     barcode = models.CharField(max_length=50, unique=True)
#     manufacturer = models.CharField(max_length=200)
#     packaging_image = models.CharField(max_length=500, blank=True, null=True)
#     is_verified = models.BooleanField(default=False)

#     def __str__(self):
#         return self.name

# class GeoLog(models.Model):
#     medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name="geo_logs")
#     timestamp = models.DateTimeField()
#     geolocation = models.CharField(max_length=200)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Log for {self.medicine.name} at {self.timestamp}"




# medicine/models.py
from django.db import models

class Medicine(models.Model):
    name                     = models.CharField(max_length=200)
    brand                    = models.CharField(max_length=200)
    barcode                  = models.CharField(max_length=50, unique=True)
    batch_number             = models.CharField(max_length=50)
    expiry_date              = models.DateField()
    manufacturer             = models.CharField(max_length=200)

    # Verification state
    is_verified              = models.BooleanField(default=False)
    activated_at             = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} [{self.barcode}]"


class ReferenceImage(models.Model):
    """
    Stores canonical packaging views for each medicine, so that
    user uploads can be matched via YOLO+ORB pipeline.
    """
    VIEW_CHOICES = [
        ('front', 'Front View'),
        ('back', 'Back View'),
        ('side', 'Side View'),
        ('top', 'Top View'),
        ('bottom', 'Bottom View'),
    ]
    medicine      = models.ForeignKey(
        Medicine,
        on_delete=models.CASCADE,
        related_name='reference_images'
    )
    view_label    = models.CharField(
        max_length=20,
        choices=VIEW_CHOICES,
        help_text="Which view of the packaging this image represents"
    )
    image_url     = models.URLField(
        max_length=500,
        help_text="Cloudinary or static URL to the reference image"
    )
    created_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('medicine', 'view_label')
        ordering = ['medicine', 'view_label']

    def __str__(self):
        return f"{self.medicine.name} - {self.get_view_label_display()}"
