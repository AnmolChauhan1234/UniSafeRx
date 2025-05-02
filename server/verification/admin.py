from django.contrib import admin
from .models import GeoLog, ScanEvent

# GeoLog Admin Configuration
class GeoLogAdmin(admin.ModelAdmin):
    list_display = ('medicine', 'timestamp', 'geolocation', 'scanned_by', 'created_at')
    search_fields = ('medicine__barcode', 'geolocation', 'scanned_by__email')
    list_filter = ('timestamp', 'medicine', 'scanned_by')
    readonly_fields = ('created_at',)

# ScanEvent Admin Configuration
class ScanEventAdmin(admin.ModelAdmin):
    list_display = ('medicine', 'user', 'role', 'timestamp', 'geolocation', 'result')
    search_fields = ('medicine__barcode', 'user__email', 'role')
    list_filter = ('timestamp', 'role', 'result', 'medicine')
    readonly_fields = ('timestamp',)

admin.site.register(GeoLog, GeoLogAdmin)
admin.site.register(ScanEvent, ScanEventAdmin)
