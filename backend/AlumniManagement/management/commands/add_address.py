import os
import json
from django.core.management.base import BaseCommand
from AlumniManagement.models import Country, Region, Province, City, Barangay

class Command(BaseCommand):
    help = 'Import data from JSON file to database'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the JSON file')

    def handle(self, *args, **options):
        file_path = options['file_path']

        with open(file_path, 'r') as json_file:
            data = json.load(json_file)

            regions = []
            provinces = []
            cities = []
            barangays = []

            country = Country.objects.get(country_name='Philippines')

            for region_code, region_data in data.items():
                region_name = region_data['region_name']
                
                region = Region(region_name=region_name, country=country)
                regions.append(region)

                province_list = region_data['province_list']
                for province_name, province_data in province_list.items():
                    province = Province(province_name=province_name, region=region)
                    provinces.append(province)

                    municipality_list = province_data['municipality_list']
                    for municipality_name, municipality_data in municipality_list.items():
                        city = City(city_name=municipality_name, province=province)
                        cities.append(city)

                        barangay_list = municipality_data['barangay_list']
                        for barangay_name in barangay_list:
                            barangay = Barangay(barangay_name=barangay_name, city=city)
                            barangays.append(barangay)

            Region.objects.bulk_create(regions)
            Province.objects.bulk_create(provinces)
            City.objects.bulk_create(cities)
            Barangay.objects.bulk_create(barangays)

        self.stdout.write(self.style.SUCCESS('Data imported successfully!'))


