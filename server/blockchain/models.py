from django.db import models
from medicine.models import Medicine

class BlockchainRecord(models.Model):
    medicine      = models.OneToOneField(Medicine, on_delete=models.CASCADE, related_name="blockchain_record")
    key           = models.CharField(max_length=200, unique=True)    # e.g. barcode|batch
    onchain_hash  = models.CharField(max_length=66)                  # 0x-prefixed SHA-256
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"On-chain record for {self.medicine.barcode}"
