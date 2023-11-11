from django.test import TestCase
from django.contrib.auth import get_user_model
from datetime import date
from .models import (
    AlumniProfile,
    GraduateInformation,
    Curriculum,
    Course,
    Department,
    CurrentJob,
    PreviousJob,
    Address,
    Country,
    Region,
    Province,
    City,
    Barangay
)

class ModelTests(TestCase):
    def setUp(self):
        User = get_user_model()
        # Create a sample user for testing
        self.user = User.objects.create_user(
            name='John Doe',
            email='john@example.com',
            password='testpassword'
        )

        self.assertEqual(self.user.name, 'John Doe')
        self.assertEqual(self.user.email, 'john@example.com')
        self.assertTrue(self.user.check_password('testpassword'))

        self.sample_country = Country.objects.create(country_name='Sample Country')
        self.sample_region = Region.objects.create(region_name='Sample Region', country=self.sample_country)
        self.sample_province = Province.objects.create(province_name='Sample Province', region=self.sample_region)
        self.sample_city = City.objects.create(city_name='Sample City', province=self.sample_province)
        self.sample_barangay = Barangay.objects.create(barangay_name='Sample Barangay', city=self.sample_city)


        self.sample_address = Address.objects.create(
            country=self.sample_country,
            region=self.sample_region,
            province=self.sample_province,
            city=self.sample_city,
            barangay=self.sample_barangay,
            street='123 Sample St'
        )

        # Create a sample curriculum
        self.curriculum = Curriculum.objects.create(
            cmo_no='CMO123',
            description='Sample Curriculum',
            curriculum_year=2023
        )

        # Create a sample course
        self.course = Course.objects.create(
            course_id='C1234567',
            course_name='Sample Course',
            course_desc='Sample Course Description',
            field_type='Sample Field',
            no_units=4,
        )

        # Create a sample alumni profile
        self.alumni_profile = AlumniProfile.objects.create(
            user=self.user,
            alumni_id='A12345',
            course=self.course,
            fname='John',
            lname='Doe',
            mi='M',
            suffix='Jr',
            sex='Male',
            religion='Christian',
            marital_status='Single',
            date_of_birth=date(1990, 1, 1),
            address=self.sample_address
        )

        # Create a sample graduate information
        self.graduate_info = GraduateInformation.objects.create(
            alumni=self.alumni_profile,
            graduation_date=date(2012, 5, 15),
            honor='Cum Laude'
        )

        # Create a sample department
        self.department = Department.objects.create(
            department_name='Sample Department',
            curriculum_year=date(2023, 1, 1),
            course=self.course
        )

        # Create a sample current job
        self.current_job = CurrentJob.objects.create(
            alumni=self.alumni_profile,
            job_type='Full-time',
            job_title='Software Engineer',
            salary=80000,
            start_date=date(2022, 1, 1),
            company_name='Tech Company',
            address=self.sample_address
        )

        # Create a sample previous job
        self.previous_job = PreviousJob.objects.create(
            alumni=self.alumni_profile,
            job_type='Part-time',
            job_title='Intern',
            salary=50000,
            start_date=date(2020, 1, 1),
            end_date=date(2021, 1, 1),
            company_name='Old Company',
            address=self.sample_address
        )

    def test_alumni_profile_str(self):
        self.assertEqual(str(self.alumni_profile), 'ID: A12345 - John Doe')

    def test_course_str(self):
        self.assertEqual(str(self.course), 'C1234567')

    def test_curriculum_str(self):
        self.assertEqual(str(self.curriculum), 'CMO123')

    def test_current_job_str(self):
        self.assertEqual(str(self.current_job), 'John Doe - Software Engineer')

    def test_previous_job_str(self):
        self.assertEqual(str(self.previous_job), 'John Doe - Intern')

    def test_alumni_count_property(self):
        self.assertEqual(self.course.alumni_count, 1)
