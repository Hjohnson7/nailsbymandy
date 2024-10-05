from bookings.models import Booking


def get_bookings(month=None, year=None):
    bookings = Booking.objects.select_related('client', 'service').all()
    if month:
            bookings = [booking for booking in bookings if booking.get_month() == int(month)]
    if year:
        bookings = [booking for booking in bookings if booking.get_year() == int(year)]
    return bookings