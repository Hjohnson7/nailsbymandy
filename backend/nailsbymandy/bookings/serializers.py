from rest_framework import serializers
from accounts.models import UserAccount
from .models import Booking, Service

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'fname', 'lname', 'email', 'mobile']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'service_name', 'time_length', 'price']

class BookingSerializer(serializers.ModelSerializer):
    client = UserSerializer(read_only=True)  # Nest the UserSerializer
    service = ServiceSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'date', 'time', 'booking_timestamp', 'message', 'client', 'service']