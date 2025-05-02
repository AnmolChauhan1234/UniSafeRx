from django.contrib import admin
from .models import Medicine, ReferenceImage
from django.utils.safestring import mark_safe

class ReferenceImageInline(admin.TabularInline):
    model = ReferenceImage
    extra = 1
    readonly_fields = ('created_at',)
    fields = ('view_label', 'image_url', 'created_at')

class MedicineAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'barcode', 'brand', 'batch_number', 
        'expiry_date', 'manufacturer', 'is_verified', 'activated_at'
    )
    list_filter = ('is_verified', 'manufacturer', 'expiry_date')
    search_fields = ('name', 'barcode', 'batch_number', 'manufacturer')
    readonly_fields = ('activated_at',)
    inlines = [ReferenceImageInline]

    def packaging_images(self, obj):
        return ', '.join([
            f'<a href="{img.image_url}" target="_blank">{img.get_view_label_display()}</a>'
            for img in obj.reference_images.all()
        ])
    packaging_images.allow_tags = True  # Deprecated in Django 2.0+, use mark_safe
    packaging_images.short_description = 'Packaging Images'

    # If using Django 2.0+, update `packaging_images` with mark_safe:
    from django.utils.safestring import mark_safe
    def packaging_images(self, obj):
        links = [
            f'<a href="{img.image_url}" target="_blank">{img.get_view_label_display()}</a>'
            for img in obj.reference_images.all()
        ]
        return mark_safe(", ".join(links))

admin.site.register(Medicine, MedicineAdmin)
