from django.contrib import admin
from .models import Distributor, Retailer, SupplyRecord

# Distributor Admin Configuration
class DistributorAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_info')
    search_fields = ('name', 'contact_info')

# Retailer Admin Configuration
class RetailerAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'contact_info')
    search_fields = ('name', 'location', 'contact_info')

# SupplyRecord Admin Configuration
class SupplyRecordAdmin(admin.ModelAdmin):
    list_display = ('medicine', 'distributor', 'retailer', 'activated_at')
    search_fields = ('medicine__barcode', 'distributor__name', 'retailer__name')
    list_filter = ('activated_at',)
    readonly_fields = ('activated_at',)

admin.site.register(Distributor, DistributorAdmin)
admin.site.register(Retailer, RetailerAdmin)
admin.site.register(SupplyRecord, SupplyRecordAdmin)
