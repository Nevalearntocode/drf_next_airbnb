# reservation/tasks.py
from celery import shared_task
from reservation.models import Reservation
from backend.celery import logger

@shared_task
def update_reservation_status():
    logger.info("Starting the update_reservation_status task.")
    reservations = Reservation.objects.all()
    for reservation in reservations:
        reservation.update_status()
        logger.info(f"Updated reservation {reservation.id} to status {reservation.status}.")
