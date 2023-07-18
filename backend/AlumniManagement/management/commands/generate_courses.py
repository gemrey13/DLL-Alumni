from django.core.management.base import BaseCommand
from AlumniManagement.models import Course

class Command(BaseCommand):
    help = 'Insert all courses into the database'

    def handle(self, *args, **options):
        courses = [
            {
                'course_id': 'BSE',
                'course_name': 'Entrepreneurship',
                'course_desc': 'Course on developing entrepreneurial skills',
                'field_type': 'business'
            },
            {
                'course_id': 'BSIT',
                'course_name': 'Bachelor of Science in Information Technology',
                'course_desc': 'Comprehensive program covering various IT topics',
                'field_type': 'technology'
            },
            {
                'course_id': 'BSPA',
                'course_name': 'Bachelor of Science in Public Administration',
                'course_desc': 'Study of public governance and policy-making processes',
                'field_type': 'government'
            },
            {
                'course_id': 'BSSW',
                'course_name': 'Bachelor of Science in Social Work',
                'course_desc': 'Preparation for a career in social services and welfare',
                'field_type': 'nonprofit'
            },
            {
                'course_id': 'BTVTED',
                'course_name': 'Bachelor of Technical and Vocational Teacher Education',
                'course_desc': 'Training for technical and vocational teaching roles',
                'field_type': 'education'
            },
            {
                'course_id': 'BSAIS',
                'course_name': 'Bachelor of Accounting Information Systems',
                'course_desc': 'Integration of accounting principles with information systems',
                'field_type': 'finance'
            },
            {
                'course_id': 'BSA',
                'course_name': 'Bachelor of Science in Accountancy',
                'course_desc': 'In-depth study of financial accounting and auditing',
                'field_type': 'finance'
            },
            {
                'course_id': 'ABELS',
                'course_name': 'Bachelor of Arts in English Language Studies',
                'course_desc': 'Exploration of English language and literature',
                'field_type': 'art'
            },
        ]

        for course_data in courses:
            course = Course(
                course_id=course_data['course_id'],
                course_name=course_data['course_name'],
                course_desc=course_data['course_desc'],
                field_type=course_data['field_type'],
            )
            course.save()

        self.stdout.write(self.style.SUCCESS('Successfully inserted all courses.'))
