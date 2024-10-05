from django.urls import path
from .views import CalendarBookingsView, GetUserBookingsView, GetPastUserBookingsView, GetUpcomingUserBookingsView

urlpatterns = [
    path('calendar-bookings', CalendarBookingsView.as_view(), name='calendar_bookings'),
    path('user-bookings-all', GetUserBookingsView.as_view(), name="user_bookings"),
    path('user-past-bookings', GetPastUserBookingsView.as_view(), name="user_past_bookings"),
    path('user-upcoming-bookings', GetUpcomingUserBookingsView.as_view(), name="user_upcoming_bookings")
]