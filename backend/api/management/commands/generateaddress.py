import json
from django.core.management.base import BaseCommand
from api.models import Country, Region, Province, City, Barangay

class Command(BaseCommand):
    help = 'Imports data from a JSON file to the database.'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='The path to the JSON file.')

    def handle(self, *args, **options):
        file_path = options['file_path']
        with open(file_path) as file:
            data = json.load(file)
            self.import_data(data)

    def import_data(self, data):
        country = Country.objects.create(country_name='Philippines')

        for region_code, region_data in data.items():
            region_name = region_data['region_name']
            region = Region.objects.create(region_name=region_name, country=country)

            province_list = region_data['province_list']
            for province_name, province_data in province_list.items():
                province = Province.objects.create(province_name=province_name, region=region)

                barangay_list = province_data['municipality_list']
                for city_name, city_data in barangay_list.items():
                    city = City.objects.create(city_name=city_name, province=province)

                    barangay_list = city_data['barangay_list']
                    barangays = [Barangay(barangay_name=barangay_name, city=city) for barangay_name in barangay_list]
                    Barangay.objects.bulk_create(barangays)

        self.stdout.write(self.style.SUCCESS('Address imported successfully!'))
