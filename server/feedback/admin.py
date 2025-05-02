from django.contrib import admin
from .models import Feedback

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'short_message', 'created_at')
    search_fields = ('user__email', 'user__full_name', 'message')
    list_filter = ('created_at',)
    readonly_fields = ('created_at',)

    def short_message(self, obj):
        return (obj.message[:75] + '...') if len(obj.message) > 75 else obj.message
    short_message.short_description = 'Message'

admin.site.register(Feedback, FeedbackAdmin)
