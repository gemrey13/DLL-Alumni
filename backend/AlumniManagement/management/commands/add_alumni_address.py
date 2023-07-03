import os
import json
from django.core.management.base import BaseCommand
from AlumniManagement.models import AlumniAddress, AlumniProfile, Country, Region, Province, City, Barangay

class Command(BaseCommand):
    help = 'Import alumni data from JSON file'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the JSON file')

    def handle(self, *args, **options):
        file_path = options['file_path']

        with open(file_path, 'r') as json_file:
            data = json.load(json_file)

            alumni_addresses = []
            for item in data:
                alumni = AlumniProfile.objects.filter(alumni_id=item['alumni']).first()
                country = Country.objects.filter(country_name=item['country']).first()
                region = Region.objects.filter(region_name=item['region']).first()
                province = Province.objects.filter(province_name=item['province']).first()
                city = City.objects.filter(city_name=item['city']).first()
                barangay = Barangay.objects.filter(barangay_name=item['barangay']).first()
                alumni_address = AlumniAddress(
                    alumni = alumni,
                    country = country,
                    region = region,
                    province = province,
                    city = city,
                    barangay = barangay,
                    street = item['street']
                )
                alumni_addresses.append(alumni_address)

            AlumniAddress.objects.bulk_create(alumni_addresses)

        self.stdout.write(self.style.SUCCESS('Alumni data imported successfully!'))
