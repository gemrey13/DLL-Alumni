from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from api.models import AlumniProfile, CustomUser, Address, Country, Region, Province, City, Barangay, Curriculum, Course
from faker import Faker
import random

fake = Faker(['fil_PH'])

class Command(BaseCommand):
    help = 'Generate alumni profiles and user accounts'

    def add_arguments(self, parser):
        parser.add_argument('num_profiles', type=int, help='Number of alumni profiles to generate')

    def handle(self, *args, **options):
        num_profiles = options['num_profiles']
        self.generateprofile(num_profiles)

    def generateprofile(self, num_profiles):

        # courses_data = [
        #     {'course_id': 'C1234567', 'course_name': 'Computer Science', 'course_desc': 'Computer Science Description', 'field_type': 'Engineering', 'no_units': 4},
        #     {'course_id': 'C2345678', 'course_name': 'Electrical Engineering', 'course_desc': 'Electrical Engineering Description', 'field_type': 'Engineering', 'no_units': 5},
        #     {'course_id': 'C3456789', 'course_name': 'Business Administration', 'course_desc': 'Business Admin Description', 'field_type': 'Business', 'no_units': 4},
        #     {'course_id': 'C4567890', 'course_name': 'Psychology', 'course_desc': 'Psychology Description', 'field_type': 'Social Science', 'no_units': 4},
        # ]

        curricula_years = [2005, 2010, 2015, 2020]
        courses_per_curriculum = 4
        curricula_years = [2005, 2010, 2015, 2020]
        courses_per_curriculum = 4

        for year in curricula_years:
            cmo_no = f'CMO{year}'
            description = f'Sample Curriculum {year}'
            curriculum_year = year
            curriculum, created = Curriculum.objects.get_or_create(
                cmo_no=cmo_no,
                defaults={'description': description, 'curriculum_year': curriculum_year}
            )

            # Create or get four courses for each curriculum year
            courses = []
            for i in range(1, courses_per_curriculum + 1):
                course_id = f'C{year}_{year * 100 + i}'
                course_name = f'Course {year * 100 + i}'
                course_desc = f'Description {year * 100 + i}'
                field_type = f'Field {year * 100 + i}'
                no_units = 4

                course, created = Course.objects.get_or_create(
                    curriculum=curriculum,
                    course_id=course_id,
                    defaults={'course_name': course_name, 'course_desc': course_desc, 'field_type': field_type, 'no_units': no_units}
                )

                courses.append(course)

        for i in range(num_profiles):
            fname = fake.first_name()
            lname = fake.last_name()
            email = f'{fname.lower()}.{lname.lower()}{get_random_string(length=8)}@gmail.com'
            password = fake.password()
            alumni_id = f'A{i+1:05d}'
            mi = fake.random_element([fake.random_letter().upper(), " ", " "])
            suffix = fake.random_element(["Jr.", "Sr.", "II", "III", " ", " "])
            contact_number = f'09{fake.random_number(digits=9)}'
            sex = fake.random_element(["male", "female"])
            religion = fake.random_element(["Christian", "Muslim", "Jewish", "Buddhist", "Other"])
            marital_status = fake.random_element(["Single", "Married", "Divorced", "Widowed"])
            date_of_birth = fake.date_of_birth(minimum_age=22, maximum_age=45)

            # Create User object
            user = CustomUser.objects.create(
                email=email,
                password=make_password(password),
            )

            philippines = Country.objects.get(country_name='Philippines')
            regions = Region.objects.all()
            provinces = Province.objects.all()
            cities = City.objects.all()
            barangays = Barangay.objects.all()

            region = random.choice(regions)
            province = random.choice(provinces.filter(region=region))
            city = random.choice(cities.filter(province=province))
            barangay = random.choice(barangays.filter(city=city))

            address = Address.objects.create(
                    country=philippines,
                    region=region,
                    province=province,
                    city=city,
                    barangay=barangay,
                    street=fake.street_address()
                )

            # Create AlumniProfile object and associate it with the User
            alumni_profile = AlumniProfile.objects.create(
                user=user,
                alumni_id=alumni_id,
                course=course,
                fname=fname,
                lname=lname,
                mi=mi,
                suffix=suffix,
                contact_number=contact_number,
                sex=sex,
                religion=religion,
                marital_status=marital_status,
                date_of_birth=date_of_birth,
                address=address
            )

            print(f'{alumni_profile} | {user} | {address}')

        self.stdout.write(self.style.SUCCESS('Alumni data imported successfully!'))
