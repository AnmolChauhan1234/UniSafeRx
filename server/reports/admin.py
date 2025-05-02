from django.contrib import admin
from .models import Report

class ReportAdmin(admin.ModelAdmin):
    list_display = ('reporter', 'medicine', 'short_reason', 'image_url', 'created_at')
    search_fields = ('reporter__username', 'medicine__barcode', 'reason')
    list_filter = ('created_at',)
    readonly_fields = ('created_at',)

    def short_reason(self, obj):
        return (obj.reason[:75] + '...') if len(obj.reason) > 75 else obj.reason
    short_reason.short_description = 'Reason'

admin.site.register(Report, ReportAdmin)
