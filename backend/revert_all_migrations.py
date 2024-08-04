import django
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from django.core.management import call_command
from django.apps import apps


def revert_all_migrations():
    for app in apps.get_app_configs():
        app_name = app.label
        print(f"Reverting migrations for {app_name}...")
        call_command("migrate", app_name, "zero", verbosity=2)


if __name__ == "__main__":
    revert_all_migrations()
