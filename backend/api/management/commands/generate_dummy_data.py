import random
from django.core.management.base import BaseCommand
from faker import Faker
from api.models import Address, AlumniProfile, Curriculum, Course
from django.contrib.auth.models import User
import json


fake = Faker()

class Command(BaseCommand):
    help = 'Generate dummy data for testing purposes'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Generating dummy data...'))

        
        curriculums = [Curriculum(
            cmo_no=f'CMO 10{_}',
            description=fake.word(),
            curriculum_year=f'{_}',
        ) for _ in range(2005, 2022, 5)]
        Curriculum.objects.bulk_create(curriculums)

        for index, every_curricula in enumerate(curriculums):
            course_id_list = ['BSIT', 'BSA', 'BSAIS', 'ABELS', 'BTVTed', 'BSPA', 'BSE', 'BSSW', 'DHRS']
            courses_list =[]

            for course in course_id_list:
                new = Course(
                    curriculum=every_curricula,
                    course_id=f'{course}-{index+1}',
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

        with open('ph-address.json') as json_file:
            data = json.load(json_file)

        region_codes = ['01', '02', '03', '4A', '4B', '05', '06', '07', '08', '09', '10', '11', '12', '13', 'BARMM', 'CAR', 'NCR']

        for i in range(20):

            random.shuffle(region_codes)

            region_code = region_codes[0]

            if region_code in ['BARMM', 'CAR', 'NCR']:
                region_name = region_code
                province_name = random.choice(list(data[region_code]['province_list'].keys()))
                province_data = data[region_code]['province_list'][province_name]
                municipality_name = random.choice(list(province_data['municipality_list'].keys()))
                municipality_data = province_data['municipality_list'][municipality_name]
                barangay_name = random.choice(municipality_data['barangay_list'])
            elif region_code in ['4A', '4B']:
                region_name = f'REGION {region_code}'
                province_name = random.choice(list(data[region_code]['province_list'].keys()))
                province_data = data[region_code]['province_list'][province_name]
                municipality_name = random.choice(list(province_data['municipality_list'].keys()))
                municipality_data = province_data['municipality_list'][municipality_name]
                barangay_name = random.choice(municipality_data['barangay_list'])
            else:
                region_data = data[region_code]
                region_name = region_data['region_name']
                province_name = random.choice(list(region_data['province_list'].keys()))
                province_data = region_data['province_list'][province_name]
                municipality_name = random.choice(list(province_data['municipality_list'].keys()))
                municipality_data = province_data['municipality_list'][municipality_name]
                barangay_name = random.choice(municipality_data['barangay_list'])

            address = Address.objects.create(
                country='Phillipines',
                region=region_name,
                province=province_name,
                city=municipality_name,
                barangay=barangay_name,
                zip_code=fake.zipcode(),
            )

            first_name = fake.first_name()
            last_name = fake.last_name()
            middle_name = fake.random_letter()
            alumni_id = f'A00-0{i+1}'

            user = User.objects.create_user(
                username=f'{alumni_id}.{first_name}',
                password='123',
                email=f'{first_name}.{alumni_id}@gmail.com',
            )

            AlumniProfile.objects.create(
                user=user,
                alumni_id=alumni_id,
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

            print(f'{i+1}/20')


        self.stdout.write(self.style.SUCCESS('Dummy data generation completed.'))
