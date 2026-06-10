from django.db import models
from cloudinary.models import CloudinaryField


# Create your models here.
class Realization(models.Model):
    SERVICE_CHOICES = (
        ('pompy', 'Pompy Ciepła'),
        ('klimatyzacja', 'Klimatyzacja'),
        ('rekuperacja', 'Rekuperacja'),
        ('fotowoltaika', 'Fotowoltaika'),
    )

    title = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    city_slug = models.SlugField(max_length=100)
    service = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    description = models.TextField()
    device_model = models.CharField(max_length=255, blank=True)
    area_m2 = models.IntegerField(blank=True, null=True)
    cover_image = CloudinaryField('image')
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Realizacja'
        verbose_name_plural = 'Realizacje'

    def __str__(self):
        return f"{self.city} - {self.title}"
