from django.contrib import admin
from .models import Service, Booking, Review, TimeOff

# Register your models here.

admin.site.register(Service)
admin.site.register(Booking)
admin.site.register(Review)
admin.site.register(TimeOff)