import os
import json
from django.core.management.base import BaseCommand
from AlumniManagement.models import AlumniProfile

class Command(BaseCommand):
    help = 'Import alumni data from JSON file'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the JSON file')

    def handle(self, *args, **options):
        file_path = options['file_path']

        with open(file_path, 'r') as json_file:
            data = json.load(json_file)

            alumni_profiles = []
            for item in data:
                alumni_profile = AlumniProfile(
                    alumni_id=item['alumni_id'],
                    fname=item['fname'],
                    lname=item['lname'],
                    mi=item['mi'],
                    suffix=item['suffix'],
                    sex=item['sex'],
                    religion=item['religion'],
                    marital_status=item['marital_status'],
                    date_of_birth=item['date_of_birth']
                )
                alumni_profiles.append(alumni_profile)

            AlumniProfile.objects.bulk_create(alumni_profiles)

        self.stdout.write(self.style.SUCCESS('Alumni data imported successfully!'))
