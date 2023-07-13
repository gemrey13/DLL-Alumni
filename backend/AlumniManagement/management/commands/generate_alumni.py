from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from AlumniManagement.models import AlumniProfile
from faker import Faker

fake = Faker(['fil_PH'])

class Command(BaseCommand):
    help = 'Generate alumni profiles and user accounts'

    def add_arguments(self, parser):
        parser.add_argument('num_profiles', type=int, help='Number of alumni profiles to generate')

    def handle(self, *args, **options):
        num_profiles = options['num_profiles']
        self.generate_alumni_profiles(num_profiles)

    def generate_alumni_profiles(self, num_profiles):
        alumni_profiles = []
        users = []

        for i in range(num_profiles):
            first_name = fake.first_name()
            last_name = fake.last_name()
            username = f"{first_name.lower()}.{last_name.lower()}"
            password = fake.password()
            email = fake.email(domain='gmail.com')

            user = User(username=username, password=make_password(password), email=email)
            users.append(user)

            alumni_id = f'A{i:05d}'

            fname = first_name
            lname = last_name
            mi = fake.random_letter().upper()
            suffix = fake.random_element(["Jr.", "Sr.", "II", "III"])

            contact_number = f'09{fake.random_number(digits=9)}'

            sex = fake.random_element(["Male", "Female"])
            religion = fake.random_element(["Christian", "Muslim", "Jewish", "Buddhist", "Other"])
            marital_status = fake.random_element(["Single", "Married", "Divorced", "Widowed"])
            date_of_birth = fake.date_of_birth(minimum_age=22, maximum_age=45)

            alumni_profile = AlumniProfile(
                alumni_id=alumni_id,
                fname=fname,
                lname=lname,
                mi=mi,
                suffix=suffix,
                contact_number=contact_number,
                sex=sex,
                religion=religion,
                marital_status=marital_status,
                date_of_birth=date_of_birth
            )
            alumni_profiles.append(alumni_profile)

        # Bulk create User objects
        User.objects.bulk_create(users)

        # Assign User objects to AlumniProfile objects
        for user, alumni_profile in zip(users, alumni_profiles):
            alumni_profile.user = user

        # Bulk create AlumniProfile objects
        AlumniProfile.objects.bulk_create(alumni_profiles)

        self.stdout.write(self.style.SUCCESS('Alumni data imported successfully!'))
