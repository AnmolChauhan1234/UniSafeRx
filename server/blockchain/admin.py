from django.contrib import admin
from .models import BlockchainRecord

class BlockchainRecordAdmin(admin.ModelAdmin):
    list_display = ('medicine', 'key', 'onchain_hash', 'registered_at')
    search_fields = ('medicine__name', 'medicine__barcode', 'key', 'onchain_hash')
    list_filter = ('registered_at',)
    readonly_fields = ('registered_at',)

admin.site.register(BlockchainRecord, BlockchainRecordAdmin)
