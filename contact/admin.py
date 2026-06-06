from django.contrib import admin
from .models import Contact, ContactStatus, EmailRecipient


admin.site.register(Contact)
admin.site.register(ContactStatus)
admin.site.register(EmailRecipient)

admin.site.site_url = "https://accord.opole.pl"
