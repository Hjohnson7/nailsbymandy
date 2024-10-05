from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.core.exceptions import ObjectDoesNotExist
import json
from .serializers import BookingSerializer
from .view_adapters.calendar_bookings import get_bookings
from django.shortcuts import get_object_or_404
from .models import Booking, Service
from accounts.models import UserAccount
from django.utils import timezone
from django.db import transaction
from datetime import datetime, timedelta
# Create your views here.


class CalendarBookingsView(View):
    def get(self, request, *args, **kwargs):
        # Return a basic HttpResponse for a GET request
        # Month is passed an integer
        month = request.GET.get('month', None)
        year = request.GET.get('year', None)
        bookings = get_bookings(month, year)
        bookings = BookingSerializer(bookings, many=True)
        return JsonResponse(bookings.data, safe=False)

class CreateBookingView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)  # Get data from request
        client = None
        # Check if user is authenticated
        if request.user.is_authenticated:
            client = get_object_or_404(UserAccount, user=request.user)
        else:
            # Create a guest client with first_name, last_name, and email
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            email = data.get('email')

            if not all([first_name, last_name, email]):
                return HttpResponse("Missing guest information", status=400)

            # Create a new guest client (assuming Client model has these fields)
            # client, created = UserAccount.objects.get_or_create(
            #     email=email,
            #     defaults={'fname': first_name, 'lname': last_name}
            # )

        # Get the service from the request
        service_id = data.get('service_id')
        service = get_object_or_404(Service, pk=service_id)

        # Extract additional booking details
        booking_date = data.get('date')
        booking_time = data.get('time')
        message = data.get('message', '')

        if not all([booking_date, booking_time]):
            return HttpResponse("Missing booking date or time", status=400)
        # ADD LOGIC TO WORK OUT time

        try:
            with transaction.atomic():  # Ensure the booking is created atomically
                # Create the booking instance
                booking = Booking.objects.create(
                    client=client,
                    service=service,
                    date=booking_date,
                    time=booking_time,
                    message=message,
                    booking_updated_timestamp=timezone.now(),
                )
            # send_email
            return JsonResponse({
                'message': 'Booking successfully created',
                'booking_id': booking.id
            }, status=201)

        except Exception as e:
            return HttpResponse(f"Error creating booking: {str(e)}", status=500)


class UpdateBookingView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)  # Get data from the request

        # Extract booking ID from data
        booking_id = data.get('id', None)

        if not booking_id:
            return HttpResponse("No ID passed, failed to update", status=400)

        # Fetch the booking by its ID, or return 404 if it doesn't exist
        booking = get_object_or_404(Booking, pk=booking_id)

        # Get the current logged-in user
        user = request.user

        # Check if the user is the client of the booking or a superuser
        if booking.client.user != user and not user.is_superuser:
            return HttpResponse("You do not have permission to update this booking.", status=403)
        
        # Update booking fields (exclude 'id' field from the update)
        for key, value in data.items():
            if key == 'id':
                continue
            if key == 'service':  # Handling foreign key for service
                try:
                    service = Service.objects.get(pk=value)
                    booking.service = service
                except Service.DoesNotExist:
                    return HttpResponse("Invalid service ID", status=400)
            elif key == 'client':  # Handling foreign key for client
                try:
                    client = UserAccount.objects.get(pk=value)
                    booking.client = client
                except UserAccount.DoesNotExist:
                    return HttpResponse("Invalid client ID", status=400)
            else:
                setattr(booking, key, value)  # Update other fields directly

        booking.booking_updated_timestamp = timezone.now()  # Set update timestamp
        booking.save()  # Save updated booking to the database

        return HttpResponse(f"{booking.client.fname} {booking.client.lname}'s booking successfully updated")

class GetUserBookingsView(View):
    def get(self, request, *args, **kwargs):
        try:
            user_email = request.user
            # user_email = "arryjohnson@hotmail.co.uk"
            if user_email:
                user = UserAccount.objects.get(email=user_email)
                bookings = Booking.objects.select_related('client', 'service').all()
                bookings = [booking for booking in bookings if booking.client.id == user.id]
                bookings = BookingSerializer(bookings, many=True)
                return JsonResponse(bookings.data, safe=False)
            return HttpResponse("You are not logged in to see this screen", status=403)
        except:
            return HttpResponse("You are not logged in to see this screen", status=403)

class GetPastUserBookingsView(View):
    def get(self, request, *args, **kwargs):
        try:
            user_email = request.user
            # user_email = "arryjohnson@hotmail.co.uk"
            if user_email:
                now = timezone.now()
                user = UserAccount.objects.get(email=user_email)
                bookings = Booking.objects.select_related('client', 'service').filter(booking_date_time__lt=now)
                bookings = [booking for booking in bookings if booking.client.id == user.id]
                bookings = BookingSerializer(bookings, many=True)
                return JsonResponse(bookings.data, safe=False)
            return HttpResponse("You are not logged in to see this screen", status=403)
        except:
            return HttpResponse("You are not logged in to see this screen", status=403)


class GetUpcomingUserBookingsView(View):
    def get(self, request, *args, **kwargs):
        try:
            user_email = request.user
            # user_email = "arryjohnson@hotmail.co.uk"
            if user_email:
                user = UserAccount.objects.get(email=user_email)
                now = timezone.now()
                bookings = Booking.objects.select_related('client', 'service').filter(booking_date_time__gte=now)
                bookings = [booking for booking in bookings if booking.client.id == user.id]
                bookings = BookingSerializer(bookings, many=True)
                return JsonResponse(bookings.data, safe=False)
            return HttpResponse("You are not logged in to see this screen", status=403)
        except Exception as e:
            return HttpResponse("You are not logged in to see this screen", status=403)


class CancelBookingView(View):
    def post(self, request, *args, **kwargs):
        user = request.user
        data = json.loads(request.body)
        booking = get_object_or_404(Booking, pk=data.get(id))
        if booking.client.user != user and not user.is_superuser:
            return HttpResponse("You do not have permission to update this booking.", status=403)
        now = datetime.now()
        twenty_four_hours_from_now = now + timedelta(hours=24)
        if booking.date < twenty_four_hours_from_now:
            return HttpResponse("Cannot cancel booking less than 24 hours before online. Please contact Mandy.", status=403)
        booking.delete()
        # send_mail()
        # send_mail_to_mandy()
        return HttpResponse("Booking successfully cancelled.", status=200)


class PostReviewView(View):
    def post(self, request, *args, **kwargs):
        pass




