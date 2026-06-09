from django.contrib import admin

# Register your models here.
from .models import GalleryImage


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('service', 'order', 'is_active', 'uploaded_at')
    list_filter = ('service', 'is_active')
    list_editable = ('order', 'is_active')
    ordering = ('service', 'order')
