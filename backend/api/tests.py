from django.test import TestCase
from django.contrib.auth.models import User
from .models import *


class ModelTests(TestCase):
    def setUp(self):
        # Create a user for testing
        self.user = User.objects.create_user(
            username="testuser", password="testpassword"
        )

        # Create a curriculum for testing
        self.curriculum = Curriculum.objects.create(
            cmo_no="CMO123",
            description="Test Curriculum",
            start_year=2020,
            end_year=2024,
        )

        # Create a course for testing
        self.course = Course.objects.create(
            curriculum=self.curriculum,
            course_id="C123",
            course_name="Test Course",
            course_desc="Course Description",
            no_units=3,
        )

        # Create an address for testing
        self.address = Address.objects.create(
            country="TestCountry",
            region="TestRegion",
            province="TestProvince",
            city="TestCity",
            barangay="TestBarangay",
            zip_code="12345",
        )

        # Create an alumni profile for testing
        self.alumni_profile = AlumniProfile.objects.create(
            user=self.user,
            alumni_id="A12345",
            course=self.course,
            fname="John",
            lname="Doe",
            mi="M",
            sex="Male",
            contact_number="1234567890",
            religion="TestReligion",
            civil_status="Single",
            date_of_birth="2000-01-01",
            birthplace="TestBirthplace",
            facebook_account_name="testuser",
            home_address=self.address,
        )

        # Create a professional growth for testing
        self.professional_growth = ProfessionalGrowth.objects.create(
            description="Test Professional Growth"
        )

        # Create a graduate information for testing
        self.graduate_info = GraduateInformation.objects.create(
            alumni=self.alumni_profile,
            year_graduated=2023,
            professional_growth=self.professional_growth,
            honor="Cum Laude",
        )

        # Create a current job for testing
        self.current_job = CurrentJob.objects.create(
            alumni=self.alumni_profile,
            job_position="Software Engineer",
            approximate_monthly_salary=5000,
            company_affiliation="Test Company",
            company_address=self.address,
            employed_within_6mo=True,
        )

        # Create an employment record for testing
        self.employment_record = EmploymentRecord.objects.create(
            alumni=self.alumni_profile,
            company_name="Test Company",
            employment_status="Full-time",
            approximate_monthly_salary=6000,
            date_employed="2023-01-01",
            getting_jobs_related_to_experience=True,
            promoted_in_current_job=False,
        )

    # def test_address_str_method(self):
    #     address_str = str(self.address).strip()
    #     expected_str = 'TestCountry, TestRegion, TestProvince, TestCity, TestBarangay'
    #     self.assertEqual(address_str, expected_str)

    def test_alumni_profile_str_method(self):
        alumni_profile_str = str(self.alumni_profile)
        self.assertEqual(alumni_profile_str, "ID: A12345 - John Doe")

    def test_graduate_info_str_method(self):
        graduate_info_str = str(self.graduate_info)
        self.assertEqual(graduate_info_str, "John Doe - Grad year:2023")

    def test_curriculum_str_method(self):
        curriculum_str = str(self.curriculum)
        self.assertEqual(curriculum_str, "CMO123(2020-2024)")

    def test_course_str_method(self):
        course_str = str(self.course)
        self.assertEqual(course_str, "CMO123(2020-2024) | C123")

    def test_current_job_str_method(self):
        current_job_str = str(self.current_job)
        self.assertEqual(current_job_str, "John Doe - Software Engineer")

    def test_employment_record_str_method(self):
        employment_record_str = str(self.employment_record)
        self.assertEqual(employment_record_str, "John Doe - Test Company, Full-time")
