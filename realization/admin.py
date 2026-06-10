from django.contrib import admin
from .models import Realization


# Register your models here.
@admin.register(Realization)
class RealizationAdmin(admin.ModelAdmin):
    list_display = ('title', 'city', 'service', 'is_published', 'created_at')
    list_filter = ('service', 'is_published', 'city')
    list_editable = ('is_published', )
    prepopulated_fields = {'city_slug': ('city', )}
    search_fields = ('city', 'title')
