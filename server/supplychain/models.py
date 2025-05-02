from django.db import models
from medicine.models import Medicine

class Distributor(models.Model):
    name        = models.CharField(max_length=200)
    contact_info= models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name

class Retailer(models.Model):
    name        = models.CharField(max_length=200)
    location    = models.CharField(max_length=200)
    contact_info= models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name

class SupplyRecord(models.Model):
    medicine    = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    distributor = models.ForeignKey(Distributor, on_delete=models.SET_NULL, null=True)
    retailer    = models.ForeignKey(Retailer, on_delete=models.SET_NULL, null=True)
    activated_at= models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('medicine', 'distributor', 'retailer')
