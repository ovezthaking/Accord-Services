from django.core.mail import send_mail
import resend
import os
import logging
from contact.models import EmailRecipient

logger = logging.getLogger(__name__)

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
resend.api_key = RESEND_API_KEY


def get_recipients():
    return list(
        EmailRecipient.objects.filter(is_active=True)
        .values_list('email', flat=True)
    )


def send_contact_mail(mail_data: dict):

    html_content = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color:#222;">Nowa wiadomość z formularza kontaktowego</h2>

        <p><strong>Imię i nazwisko:</strong> {mail_data.get('full_name')}</p>
        <p><strong>Email:</strong> {mail_data.get('email')}</p>
        <p><strong>Telefon:</strong> {mail_data.get('phone_number')}</p>
        <p><strong>Usługa:</strong> {mail_data.get('services')}</p>

        <hr />

        <h3>Treść wiadomości:</h3>
        <p style="white-space: pre-wrap;">{mail_data.get('description', 'Nie podano')}</p>

        <hr />

        <p style="font-size: 12px; color: #888;">
            Wysłano automatycznie z formularza kontaktowego Accord Service
        </p>
    </div>
    """

    if RESEND_API_KEY:
        try:
            resend.Emails.send({
                "from": "Accord Service <kontakt@accord.opole.pl>",
                "to": get_recipients(),
                "subject": f"{mail_data.get('full_name')} - {mail_data.get('services')}",
                "html": html_content,
                "reply_to": mail_data.get("email"),
            })
        except Exception as e:
            logger.exception("Resend failed: %s", e)

    else:
        logger.error("RESEND_API_KEY not set - email not sent")
        send_mail(
            subject=mail_data.get('full_name') + ' - ' + mail_data.get('services'),
            message='Otrzymano wiadomość:\n' +
            f"Imię i nazwisko: {mail_data.get('full_name')}\n" +
            f"Adres e-mail: {mail_data.get('email')}\n" +
            f"Numer telefonu: {mail_data.get('phone_number')}\n" +
            'Treść wiadomości: \n' +
            mail_data.get('description'),
            from_email="accordstrona@gmail.com",
            recipient_list=get_recipients(),
            fail_silently=False
        )
