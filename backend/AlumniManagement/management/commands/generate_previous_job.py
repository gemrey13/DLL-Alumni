import random
from datetime import date, timedelta
from django.core.management.base import BaseCommand
from faker import Faker
from AlumniManagement.models import AlumniProfile, PreviousJob, JobAddress


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


class Command(BaseCommand):
    help = 'Generate data for PreviousJob and JobAddress models'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int, help='Number of records to generate')
        parser.add_argument('--no-prev-job-prob', type=float, default=0.2, help='Probability of alumni without previous jobs')

    def handle(self, *args, **options):
        count = options['count']
        no_prev_job_prob = options['no_prev_job_prob']
        alumni_profiles = AlumniProfile.objects.all()
        fake = Faker()

        countries = JobAddress.objects.values_list('country', flat=True).distinct()
        regions = JobAddress.objects.values_list('region', flat=True).distinct()
        provinces = JobAddress.objects.values_list('province', flat=True).distinct()
        cities = JobAddress.objects.values_list('city', flat=True).distinct()
        barangays = JobAddress.objects.values_list('barangay', flat=True).distinct()

        for alumni in alumni_profiles:
            generate_prev_job = random.random() > no_prev_job_prob

            if generate_prev_job:
                num_previous_jobs = random.randint(1, count)

                for _ in range(num_previous_jobs):
                    current_job = alumni.currentjob_set.last()  # Get the most recent current job

                    if current_job:
                        start_date = current_job.start_date
                    else:
                        start_date = alumni.graduate_set.last().graduation_date

                    max_days_after_start = (date.today() - start_date).days

                    if max_days_after_start < 0:
                        max_days_after_start = 0  # Set to 0 if negative

                    end_date = start_date + timedelta(days=random.randint(0, max_days_after_start))

                    if end_date < start_date:
                        start_date, end_date = end_date, start_date

                    country = random.choice(countries)
                    region = random.choice(regions.filter(country=country))
                    province = random.choice(provinces.filter(region=region))
                    city = random.choice(cities.filter(province=province))
                    barangay = random.choice(barangays.filter(city=city))
                    street = fake.street_address()

                    job_address = JobAddress.objects.create(
                        country_id=country,
                        region_id=region,
                        province_id=province,
                        city_id=city,
                        barangay_id=barangay,
                        street=street
                    )

                    unique_previous_job_id = self.generate_unique_previous_job_id()
                    job_type = random.choice([choice[0] for choice in FIELD_CHOICES])
                    job_title = fake.job()
                    salary = random.randint(1000, 100000)
                    company_name = fake.company()

                    previous_job = PreviousJob.objects.create(
                        previous_job_id=unique_previous_job_id,
                        job_type=job_type,
                        job_title=job_title,
                        salary=salary,
                        start_date=start_date,
                        end_date=end_date,
                        company_name=company_name,
                        alumni=alumni,
                        address=job_address
                    )

                    self.stdout.write(self.style.SUCCESS(f'Successfully created PreviousJob: {previous_job}'))

            self.stdout.write(self.style.SUCCESS(f'Successfully processed AlumniProfile: {alumni}'))

    def generate_unique_previous_job_id(self):
        existing_ids = set(PreviousJob.objects.values_list('previous_job_id', flat=True))
        unique_id = None

        while not unique_id:
            generated_id = random.randint(100000, 999999)
            if generated_id not in existing_ids:
                unique_id = generated_id

        return unique_id

