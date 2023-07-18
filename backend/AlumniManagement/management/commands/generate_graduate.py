from django.core.management.base import BaseCommand
from random import choice, randint
from datetime import datetime
from AlumniManagement.models import Graduate, AlumniProfile, Course, Curriculum


class Command(BaseCommand):
    help = 'Generate Graduate instances'

    def handle(self, *args, **options):
        min_alumni_id = 0
        max_alumni_id = 499
        graduation_years = list(range(2015, 2024))
        courses = Course.objects.all()
        curriculums = Curriculum.objects.all()

        for i in range(min_alumni_id, max_alumni_id + 1):
            alumni_id = f'A{i:05}'

            try:
                alumni_profile = AlumniProfile.objects.get(alumni_id=alumni_id)
            except AlumniProfile.DoesNotExist:
                continue

            graduate = Graduate()
            graduate.graduate_id = alumni_id
            graduate.alumni = alumni_profile

            graduate.graduation_date = datetime(
                year=choice(graduation_years),
                month=randint(1, 12),
                day=randint(1, 28)
            ).date()

            graduate.course = choice(courses)
            graduate.curriculum = choice(curriculums)

            graduate.save()

        self.stdout.write(self.style.SUCCESS('Graduate instances generated successfully.'))
