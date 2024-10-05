from django.db import models
from datetime import datetime
from django.utils import timezone
from accounts.models import UserAccount
# Create your models here.


class Service(models.Model):
    service_name = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=5)
    time_length = models.DecimalField(decimal_places=2, max_digits=5)
    service_description = models.CharField(max_length=600)
    service_image = models.ImageField(upload_to='images/service_images/', default=None, blank=True, null=True)
    waxing = models.BooleanField(default=False)
    hidden = models.BooleanField(default=False)

class Booking(models.Model):
    client = models.ForeignKey(UserAccount, on_delete=models.CASCADE, default=None, related_name="client")
    booking_timestamp = models.DateTimeField(default=timezone.now)
    booking_updated_timestamp = models.DateTimeField(default=timezone.now, null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, default=None, null=False, related_name="service")
    message = models.CharField(max_length=200)
    booking_date_time = models.DateTimeField(default=None, null=True, blank=True)
    date = models.DateField()
    time = models.DecimalField(decimal_places=2, max_digits=5)
    paid = models.BooleanField()
    discount = models.IntegerField()
    discont_details = models.CharField(max_length=100)
    fname = models.CharField(max_length=40)
    lname = models.CharField(max_length=60)
    email = models.EmailField()
    is_cancelled = models.BooleanField(default=False, null=True, blank=True)

    def get_month(self):
        return self.date.month

    def get_year(self):
        return self.date.year

    @staticmethod
    def get_booking_time(self):
        pass

    
class TimeOff(models.Model):
    date = models.DateField()
    time_of_booking = models.DecimalField(decimal_places=2, max_digits=5)
    hours_off = models.DecimalField(decimal_places=2, max_digits=5)

class Discount(models.Model):
    discount = models.IntegerField()
    description = models.CharField(max_length=200)
    active = models.BooleanField(default=False)
    end_date = models.DateField()

class Review(models.Model):
    title = models.CharField(max_length=150)
    review_description = models.CharField(max_length=600)
    stars = models.DecimalField(decimal_places=2, max_digits=5)
    reviewer = models.ForeignKey(UserAccount, on_delete=models.CASCADE, default=None, related_name="user_posting")
    date_posted = models.DateField()
    display_review = models.BooleanField(default=False)





    