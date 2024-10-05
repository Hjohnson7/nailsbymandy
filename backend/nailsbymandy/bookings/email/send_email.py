from django.shortcuts import render
from .email import ProfessionalEmail
import os

def send_booking_confirmation(booking_details, client_details):
    # Example data to pass to the email template
    email_context = {
        'title': 'Booking Confirmation',
        'message': f'Hi {client_details.fname}, </br>Thank you for booking with NailsByMandy. Your appointment is confirmed.',
        'image_path': os.path.join('path', 'to', 'image', 'logo.png')  # Provide the path to your image
    }
    
    # Send the email
    email = ProfessionalEmail(
        subject="Your Booking Confirmation",
        template_name="email_template.html",
        recipient_list=['client@example.com'],
        **email_context
    )
    email.send()
