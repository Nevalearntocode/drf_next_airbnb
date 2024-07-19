from django.contrib import admin
from users.models import CustomUser
from property.models import Property
from reservation.models import Reservation

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Property)
admin.site.register(Reservation)