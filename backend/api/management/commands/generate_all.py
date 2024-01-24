from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth.models import User
import os


class Command(BaseCommand):
    help = "Run multiple commands in sequence"

    def handle(self, *args, **options):
        db_file_path = "db.sqlite3"
        if os.path.exists(db_file_path):
            os.remove(db_file_path)
            print(f"\n\n\nRemoved SQLite database file: {db_file_path}")

        app_name = "api"
        migrations_path = os.path.join(app_name, "migrations")
        if os.path.exists(migrations_path):
            for root, dirs, files in os.walk(migrations_path):
                for file in files:
                    if file.endswith(".py") and file != "__init__.py":
                        file_path = os.path.join(root, file)
                        os.remove(file_path)
                        print(f"\n\n\nRemoved migration file: {file_path}\n\n\n")

        call_command("makemigrations")
        call_command("migrate")

        User.objects.create_superuser(
            username="admin",
            password="admin",
            first_name="Gem Rey",
            last_name="Rañola",
            email="gemreyranola@gmail.com",
        )

        print("\n\n\nAdmin Profile Generated\n\n\n")

        call_command("generate_jobs")
        call_command("generate_dummy_data")

        self.stdout.write(
            self.style.SUCCESS("Successfully ran data generation commands")
        )
