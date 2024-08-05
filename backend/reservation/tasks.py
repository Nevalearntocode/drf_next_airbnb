from celery import shared_task
from celery.schedules import crontab
from reservation.models import Reservation
from backend.celery import app

@shared_task
def update_reservation_status():
    reservations = Reservation.objects.exclude(status="ended")
    for reservation in reservations:
        reservation.update_status()


# @shared_task()
# def thirty_second_func():
#     print("I run every 30 seconds using Celery Beat")
#     return "Done"

app.conf.beat_schedule = {
    "update-reservation-status-everyday": {
        "task": "reservation.tasks.update_reservation_status",
        "schedule": crontab(hour=0, minute=0),
    },
}
