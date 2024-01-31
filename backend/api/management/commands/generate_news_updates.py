from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth.models import User
from api.models import SystemUpdate


class Command(BaseCommand):
    help = "Run multiple commands in sequence"

    def handle(self, *args, **options):
        SystemUpdate.objects.create(
            title="Enhancing Your Experience",
            description="Our latest system update includes performance enhancements and bug fixes to ensure a smoother and more reliable experience for all users",
        )
        SystemUpdate.objects.create(
            title="The Latest Update",
            description="Our new system update optimizes efficiency and introduces exciting features for a more productive experience.",
        )
        SystemUpdate.objects.create(
            title="What's New?",
            description="Explore our latest feature additions that enhance your experience and provide even more capabilities.",
        )
        self.stdout.write(self.style.SUCCESS("Generated system updates"))
