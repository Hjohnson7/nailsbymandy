from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from email.mime.image import MIMEImage
import os

class ProfessionalEmail:
    def __init__(self, subject, template_name, recipient_list, **kwargs):
        self.subject = subject
        self.template_name = template_name
        self.recipient_list = recipient_list
        self.context = kwargs  # Context for template rendering

    def send(self):
        # Render the HTML content with the provided context
        html_content = render_to_string(self.template_name, self.context)
        plain_message = strip_tags(html_content)  # Fallback to plain text
        
        # Create the email
        email = EmailMessage(
            subject=self.subject,
            body=plain_message,
            from_email='nailsbymandyuk@gmail.com',
            to=self.recipient_list
        )
        email.content_subtype = 'html'  # Set email to be sent as HTML

        # Attach any images (if you have inline images)
        image_path = self.context.get('image_path', None)
        if image_path:
            with open(image_path, 'rb') as img:
                image = MIMEImage(img.read())
                image.add_header('Content-ID', '<company-logo>')
                email.attach(image)
        
        # Send the email
        email.send(fail_silently=False)

