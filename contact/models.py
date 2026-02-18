from django.db import models
from django.core.validators import RegexValidator, EmailValidator


# Create your models here.
class Contact(models.Model):
    SERVICE_CHOICES = (
        ('pompy', 'Pompy'),
        ('klimatyacja', 'Klimatyzacja'),
        ('rekuperacja', 'Rekuperacja'),
        ('fotowoltaika', 'Fotowoltaika'),
        ('serwis', 'Serwis')
    )

    phone_regex = RegexValidator(
        regex=r'^\+?[\d\s().-]{5,25}$',
        message='Phone format: +99999999. Up to 15 digits.'
    )

    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(
        max_length=25,
        unique=True,
        validators=[phone_regex]
    )
    email = models.EmailField(
        max_length=254,
        unique=True,
        validators=[EmailValidator()]
    )
    services = models.CharField(
        max_length=50,
        choices=SERVICE_CHOICES,
        default='pompy'
    )
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-createdAt']

    def __str__(self):
        return self.full_name
