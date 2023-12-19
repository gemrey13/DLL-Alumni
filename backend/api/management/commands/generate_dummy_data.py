import random
from django.core.management.base import BaseCommand
from faker import Faker
from api.models import Address, AlumniProfile, Curriculum, Course

fake = Faker()

class Command(BaseCommand):
    help = 'Generate dummy data for testing purposes'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Generating dummy data...'))

        
        curriculums = [Curriculum(
            cmo_no=f'100{_}',
            description=fake.word(),
            curriculum_year=f'{_}',
        ) for _ in range(2000, 2022, 5)]
        Curriculum.objects.bulk_create(curriculums)

        for index, every_curricula in enumerate(curriculums):
            course_id_list = ['BSIT', 'BSA', 'BSAIS', 'ABELS', 'BTVTed', 'BSPA', 'BSE', 'BSSW', 'DHRS']
            courses_list =[]

            for course in course_id_list:
                new = Course(
                    curriculum=every_curricula,
                    course_id=f'{course}{index+1}',
                    course_name=course,
                    course_desc=fake.text(),
                    field_type=fake.word(),
                    no_units=random.randint(100, 300),
                )
                courses_list.append(new)
            
            Course.objects.bulk_create(courses_list)

        province = ['Quezon', 'Batangas', 'Laguna']
        religion = ['Catholic', 'INC', 'Muslim']
        marital = ['Single', 'Married', 'Widowed']

        for i in range(20):
            address = Address.objects.create(
                country='Phillipines',
                region='Region 4A',
                province=random.choice(province),
                city=fake.city(),
                barangay=fake.word(),
                zip_code=fake.zipcode(),
            )

            first_name = fake.first_name()
            last_name = fake.last_name()
            middle_name = fake.random_letter()

            AlumniProfile.objects.create(
                alumni_id=f'A0000{i}',
                course=random.choice(courses_list),
                fname=first_name,
                lname=last_name,
                mi=middle_name,
                suffix=fake.random_letter(),
                sex=random.choice(['Male', 'Female']),
                contact_number=fake.phone_number(),
                religion=random.choice(religion),
                marital_status=random.choice(marital),
                date_of_birth=fake.date_of_birth(),
                facebook_account_name=f'{first_name} {middle_name} {last_name}',
                address=address,
            )


        self.stdout.write(self.style.SUCCESS('Dummy data generation completed.'))
