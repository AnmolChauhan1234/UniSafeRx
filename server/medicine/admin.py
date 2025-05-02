from django.contrib import admin
from .models import Medicine

class MedicineAdmin(admin.ModelAdmin):
    list_display = ('name', 'barcode', 'brand', 'batch_number', 'expiry_date', 'manufacturer', 'is_verified', 'activated_at')
    list_filter = ('is_verified', 'manufacturer', 'expiry_date')
    search_fields = ('name', 'barcode', 'batch_number', 'manufacturer')
    readonly_fields = ('activated_at',)

    # If you want to display packaging images as clickable links
    def packaging_images(self, obj):
        return ', '.join([f'<a href="{img}" target="_blank">Image</a>' for img in obj.official_packaging_images])
    packaging_images.allow_tags = True
    packaging_images.short_description = 'Packaging Images'

admin.site.register(Medicine, MedicineAdmin)
