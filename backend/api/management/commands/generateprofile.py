from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from api.models import AlumniProfile
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
        for i in range(num_profiles):
            fname = fake.first_name()
            lname = fake.last_name()
            email = f'{fname.lower()}.{lname.lower()}@gmail.com'
            password = fake.password()
            alumni_id = f'A{i:05d}'
            mi = fake.random_element([fake.random_letter().upper(), " ", " "])
            suffix = fake.random_element(["Jr.", "Sr.", "II", "III", " ", " "])
            contact_number = f'09{fake.random_number(digits=9)}'
            sex = fake.random_element(["male", "female"])
            religion = fake.random_element(["Christian", "Muslim", "Jewish", "Buddhist", "Other"])
            marital_status = fake.random_element(["Single", "Married", "Divorced", "Widowed"])
            date_of_birth = fake.date_of_birth(minimum_age=22, maximum_age=45)

            # Create User object
            user = User.objects.create(
                username=f"{fname.lower()}.{lname.lower()}_{get_random_string(length=8)}",
                password=make_password(password),
                email=email
            )

            # Create AlumniProfile object and associate it with the User
            alumni_profile = AlumniProfile.objects.create(
                alumni_id=alumni_id,
                fname=fname,
                lname=lname,
                mi=mi,
                suffix=suffix,
                contact_number=contact_number,
                sex=sex,
                religion=religion,
                marital_status=marital_status,
                date_of_birth=date_of_birth,
                user=user
            )

            print(f'{alumni_profile} and {user}')

        self.stdout.write(self.style.SUCCESS('Alumni data imported successfully!'))
