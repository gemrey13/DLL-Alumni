from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string
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

        # Generate all the required data beforehand

        fname = fake.first_name()
        lname = fake.last_name()
        fake_data = [
            {
                'first_name': fname,
                'last_name': lname,
                'password': fake.password(),
                # 'email': fake.email(domain='gmail.com'),
                'email': f'{fname}.{lname}@gmail.com',
                'alumni_id': f'A{i:05d}',
                'mi': fake.random_letter().upper(),
                'suffix': fake.random_element(["Jr.", "Sr.", "II", "III"]),
                'contact_number': f'09{fake.random_number(digits=9)}',
                'sex': fake.random_element(["male", "female"]),
                'religion': fake.random_element(["Christian", "Muslim", "Jewish", "Buddhist", "Other"]),
                'marital_status': fake.random_element(["Single", "Married", "Divorced", "Widowed"]),
                'date_of_birth': fake.date_of_birth(minimum_age=22, maximum_age=45),
            }
            for i in range(num_profiles)
        ]

        for data in fake_data:
            user = User(
                username=f"{data['first_name'].lower()}.{data['last_name'].lower()}_{get_random_string(length=8)}",
                password=make_password(data['password']),
                email=data['email']
            )
            users.append(user)

            alumni_profile = AlumniProfile(
                alumni_id=data['alumni_id'],
                fname=data['first_name'],
                lname=data['last_name'],
                mi=data['mi'],
                suffix=data['suffix'],
                contact_number=data['contact_number'],
                sex=data['sex'],
                religion=data['religion'],
                marital_status=data['marital_status'],
                date_of_birth=data['date_of_birth']
            )
            alumni_profiles.append(alumni_profile)

            print(f'{alumni_profile} and {user}')


        # Bulk create User objects
        User.objects.bulk_create(users)

        # Assign User objects to AlumniProfile objects
        for user, alumni_profile in zip(users, alumni_profiles):
            alumni_profile.user = user

        # Bulk create AlumniProfile objects
        AlumniProfile.objects.bulk_create(alumni_profiles)

        self.stdout.write(self.style.SUCCESS('Alumni data imported successfully!'))
