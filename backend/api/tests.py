from django.test import TestCase
from datetime import date
from .models import (
    AlumniProfile,
    GraduateInformation,
    Curriculum,
    Course,
    CurrentJob,
    PreviousJob,
    Address,
    Country,
    Region,
    Province,
    City,
    Barangay,
    CustomUser
)

class ModelTests(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='john@example.com',
            password='testpassword'
        )

        self.assertEqual(self.user.email, 'john@example.com')
        self.assertTrue(self.user.check_password('testpassword'))

        self.sample_country = Country.objects.create(country_name='Sample Country')
        self.sample_region = Region.objects.create(region_name='Sample Region', country=self.sample_country)
        self.sample_province = Province.objects.create(province_name='Sample Province', region=self.sample_region)
        self.sample_city = City.objects.create(city_name='Sample City', province=self.sample_province)
        self.sample_barangay = Barangay.objects.create(barangay_name='Sample    Barangay', city=self.sample_city)


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
            curriculum=self.curriculum,
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
            contact_number='09258749673',
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
        expected_str = f'ID: {self.alumni_profile.alumni_id} - {self.alumni_profile.fname} {self.alumni_profile.lname}'
        self.assertEqual(str(self.alumni_profile), expected_str)

    def test_course_str(self):
        self.assertEqual(str(self.course), self.course.course_id)

    def test_curriculum_str(self):
        self.assertEqual(str(self.curriculum), self.curriculum.cmo_no)

    def test_current_job_str(self):
        expected_str = f'{self.current_job.alumni.fname} {self.current_job.alumni.lname} - {self.current_job.job_title}'
        self.assertEqual(str(self.current_job), expected_str)

    def test_previous_job_str(self):
        expected_str = f'{self.previous_job.alumni.fname} {self.previous_job.alumni.lname} - {self.previous_job.job_title}'
        self.assertEqual(str(self.previous_job), expected_str)

    def test_alumni_count_property(self):
        expected_count = 1
        self.assertEqual(self.course.alumni_count, expected_count)
