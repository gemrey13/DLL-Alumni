from django.core.management.base import BaseCommand
from AlumniManagement.models import Course

class Command(BaseCommand):
    help = 'Insert all courses into the database'

    def handle(self, *args, **options):
        courses = [
            {'course_id': 'BSE', 'course_name': 'Entrepreneurship', 'field_type': 'business'},
            {'course_id': 'BSIT', 'course_name': 'Bachelor of Science in Information Technology', 'field_type': 'technology'},
            {'course_id': 'BSPA', 'course_name': 'Bachelor of Science in Public Administration', 'field_type': 'government'},
            {'course_id': 'BSSW', 'course_name': 'Bachelor of Science in Social Work', 'field_type': 'nonprofit'},
            {'course_id': 'BTVTED', 'course_name': 'Bachelor of Technical and Vocational Teacher Education', 'field_type': 'education'},
            {'course_id': 'BSAIS', 'course_name': 'Bachelor of Accounting Information Systems', 'field_type': 'finance'},
            {'course_id': 'BSA', 'course_name': 'Bachelor of Science in Accountancy', 'field_type': 'finance'},
            {'course_id': 'ABELS', 'course_name': 'Bachelor of Arts in English Language Studies', 'field_type': 'art'},
        ]

        for course_data in courses:
            course = Course(
                course_id=course_data['course_id'],
                course_name=course_data['course_name'],
                field_type=course_data['field_type'],
            )
            course.save()

        self.stdout.write(self.style.SUCCESS('Successfully inserted all courses.'))
