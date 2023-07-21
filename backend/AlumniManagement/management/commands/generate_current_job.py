import random
from datetime import date, timedelta
from django.core.management.base import BaseCommand
from faker import Faker
from AlumniManagement.models import CurrentJob, AlumniProfile, JobAddress, Graduate, Country, Region, Province, City, Barangay


class Command(BaseCommand):
    help = 'Generate data for CurrentJob and JobAddress models'

    FIELD_CHOICES = [
        ('technology', 'Technology'),
        ('medical', 'Medical/Healthcare'),
        ('mechanical', 'Mechanical Engineering'),
        ('electrical', 'Electrical Engineering'),
        ('finance', 'Finance/Accounting'),
        ('education', 'Education/Teaching'),
        ('marketing', 'Marketing/Advertising'),
        ('sales', 'Sales'),
        ('business', 'Business Development'),
        ('hr', 'Human Resources'),
        ('law', 'Law/Legal'),
        ('consulting', 'Consulting'),
        ('manufacturing', 'Manufacturing'),
        ('hospitality', 'Hospitality/Travel'),
        ('retail', 'Retail'),
        ('media', 'Media/Entertainment'),
        ('art', 'Art/Design'),
        ('architecture', 'Architecture'),
        ('nonprofit', 'Nonprofit/Volunteering'),
        ('government', 'Government/Public Administration'),
    ]

    def handle(self, *args, **options):
        alumni_profiles = AlumniProfile.objects.all()
        count = len(alumni_profiles)
        fake = Faker()

        countries = Country.objects.all()
        regions = Region.objects.all()
        provinces = Province.objects.all()
        cities = City.objects.all()
        barangays = Barangay.objects.all()
        current_id = 100000
        for alumni in alumni_profiles:
            graduation = Graduate.objects.get(alumni=alumni)

            if random.choice([True, False]):
                # Generate data for JobAddress model
                country = random.choice(countries)
                region = random.choice(regions.filter(country=country))
                province = random.choice(provinces.filter(region=region))
                city = random.choice(cities.filter(province=province))
                barangay = random.choice(barangays.filter(city=city))
                street = fake.street_name()

                job_address = JobAddress.objects.create(
                    country=country,
                    region=region,
                    province=province,
                    city=city,
                    barangay=barangay,
                    street=fake.street_address()
                )
            else:
                job_address = None

            if job_address:
                # Generate data for CurrentJob model
                current_job_id = current_id
                current_id += 1
                job_type = fake.random_element(elements=self.FIELD_CHOICES)
                job_title = fake.job()
                salary = random.randint(1000, 10000)
                start_date = graduation.graduation_date + timedelta(days=random.randint(1, 365))
                company_name = fake.company()

                current_job = CurrentJob.objects.create(
                    current_job_id=current_job_id,
                    job_type=job_type[0],
                    job_title=job_title,
                    salary=salary,
                    start_date=start_date,
                    company_name=company_name,
                    alumni=alumni,
                    address=job_address
                )

                self.stdout.write(self.style.SUCCESS(f'Successfully created CurrentJob: {current_job}'))

            self.stdout.write(self.style.SUCCESS(f'Successfully processed AlumniProfile: {alumni}'))
