# Generated by Django 5.1.1 on 2024-09-20 09:58
from django.db import migrations, models
import django.utils.timezone



class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0007_alter_booking_booking_updated_timestamp_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='booking_updated_timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now(), null=None, blank=True),
        ),
    ]
