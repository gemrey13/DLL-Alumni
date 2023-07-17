import random
from django.core.management.base import BaseCommand
from faker import Faker
from AlumniManagement.models import AlumniProfile, AlumniAddress, City, Province, Region, Country, Barangay


class Command(BaseCommand):
    help = 'Generates AlumniAddress for every AlumniProfile'

    def handle(self, *args, **options):
        fake = Faker(['fil_PH'])

        # Get the Philippines country instance
        philippines = Country.objects.get(country_name='Philippines')

        # Retrieve all existing region, province, city, and barangay instances
        regions = Region.objects.all()
        provinces = Province.objects.all()
        cities = City.objects.all()
        barangays = Barangay.objects.all()

        alumni_addresses = []

        # Iterate over AlumniProfiles and create AlumniAddress instances
        for alumni_profile in AlumniProfile.objects.all():
            # Choose random addresses from the existing data
            region = random.choice(regions)
            province = random.choice(provinces.filter(region=region))
            city = random.choice(cities.filter(province=province))
            barangay = random.choice(barangays.filter(city=city))

            # Generate a random street name using Faker
            street = fake.street_name()

            # Create the AlumniAddress instance
            alumni_address = AlumniAddress(
                alumni=alumni_profile,
                country=philippines,
                region=region,
                province=province,
                city=city,
                barangay=barangay,
                street=street,
            )

            print(f'{alumni_profile} and {alumni_address}')

            alumni_addresses.append(alumni_address)

        # Bulk create the AlumniAddress instances
        AlumniAddress.objects.bulk_create(alumni_addresses)

        self.stdout.write(self.style.SUCCESS(f'Successfully created AlumniAddress for {len(alumni_addresses)} AlumniProfiles'))
