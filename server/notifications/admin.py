from django.contrib import admin
from .models import Notification

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'short_message', 'is_read', 'created_at')
    search_fields = ('user__username', 'message')
    list_filter = ('is_read', 'created_at')
    readonly_fields = ('created_at',)

    def short_message(self, obj):
        return (obj.message[:75] + '...') if len(obj.message) > 75 else obj.message
    short_message.short_description = 'Message'

admin.site.register(Notification, NotificationAdmin)
