from django.core.management.base import BaseCommand
from AlumniManagement.models import Curriculum

class Command(BaseCommand):
    help = 'Inserts data into the Curriculum model'

    def handle(self, *args, **options):
        curriculum_data = [
            {
                'curriculum_id': 'C001',
                'curriculum_name': 'CMO No. 4, Series of 2023 – Updated Guidelines on Onsite Learning in Higher Education',
                'description': 'Updated guidelines on onsite learning in higher education for the year 2023.',
                'is_active': True,
                'year': '2023'
            },
            {
                'curriculum_id': 'C002',
                'curriculum_name': 'CMO No. 18, Series of 2022 – Policies, Standards and Guidelines on the Grant of Institutional Recognition as a Higher Education Institution to Local Universities and Colleges (LUCs)',
                'description': 'Policies, standards, and guidelines for granting institutional recognition to local universities and colleges (LUCs) in 2022.',
                'is_active': True,
                'year': '2022'
            },
            {
                'curriculum_id': 'C003',
                'curriculum_name': 'CMO No. 13, Series of 2021 – Revised Policies, Standards, and Guidelines for Associate in Computer Technology (ACT) Degree Program',
                'description': 'Revised policies, standards, and guidelines for the Associate in Computer Technology (ACT) degree program in 2021.',
                'is_active': True,
                'year': '2021'
            },
            {
                'curriculum_id': 'C004',
                'curriculum_name': 'CMO No. 14, Series of 2019 – Policies and guidelines in the Issuance of Certificate of Program Compliance (COPC) to State Universities and Colleges (SUCs) and Local Universities and Colleges (LUCs)',
                'description': 'Policies and guidelines for issuing Certificate of Program Compliance (COPC) to State Universities and Colleges (SUCs) and Local Universities and Colleges (LUCs) in 2019.',
                'is_active': True,
                'year': '2019'
            },
            {
                'curriculum_id': 'C005',
                'curriculum_name': 'CMO No. 4, Series of 2018 – Policy on the Offering of Filipino and Panitikan Subjects in All Higher Education Programs as Part of the New General Education Curriculum',
                'description': 'Policy on offering Filipino and Panitikan subjects in all higher education programs as part of the new general education curriculum in 2018.',
                'is_active': True,
                'year': '2018'
            },
            {
                'curriculum_id': 'C006',
                'curriculum_name': 'CMO No. 30, Series of 2017 – Policies, Standards and Guidelines (PSGs) for the Bachelor of Science in Accounting Information Systems (BSAIS)',
                'description': 'Policies, standards, and guidelines for the Bachelor of Science in Accounting Information Systems (BSAIS) in 2017.',
                'is_active': True,
                'year': '2017'
            },
            {
                'curriculum_id': 'C007',
                'curriculum_name': 'CMO No. 34, Series of 2016 – Selective Crediting of SHS Subjects to College for SHS Graduates Entering College on AY-2016-17 and 2017-18',
                'description': 'Selective crediting of Senior High School (SHS) subjects to college for SHS graduates entering college on AY-2016-17 and 2017-18 as per CMO No. 34, Series of 2016.',
                'is_active': True,
                'year': '2016'
            },
            {
                'curriculum_id': 'C008',
                'curriculum_name': 'CMO No. 27, Series of 2015 – Guidelines and Procedures on the Issuance of National Service Training Program (NSTP) Serial Numbers',
                'description': 'Guidelines and procedures on the issuance of National Service Training Program (NSTP) serial numbers as per CMO No. 27, Series of 2015.',
                'is_active': True,
                'year': '2015'
            },
        ]

        for data in curriculum_data:
            curriculum = Curriculum(**data)
            curriculum.save()

        self.stdout.write(self.style.SUCCESS('Data inserted successfully.'))
