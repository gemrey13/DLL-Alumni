import random
from django.core.management.base import BaseCommand
from datetime import datetime, timedelta
from faker import Faker
from api.models import Address, AlumniProfile, Curriculum, Course, GraduateInformation, CurrentJob, EmploymentRecord
from django.contrib.auth.models import User
import numpy as np
import json
from django.db import transaction

fake = Faker()

class Command(BaseCommand):
    help = 'Generate dummy data for testing purposes'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Generating dummy data...'))
        
        job_positions = [
            "Software Engineer",
            "Marketing Manager",
            "Project Manager",
            "Sales Representative",
            "Accountant",
            "Human Resources Specialist",
            "Graphic Designer",
            "Customer Support Representative",
            "Research Analyst",
            "Executive Assistant",
            "Data Scientist",
            "Operations Manager",
            "Product Manager",
            "Nurse",
            "Teacher",
            "Electrician",
            "Chef",
            "Mechanical Engineer",
            "Financial Analyst",
            "Web Developer"
        ]

        company_affiliations = [
            "ABC Corporation",
            "XYZ Industries",
            "Tech Innovators Ltd.",
            "Global Solutions Inc.",
            "Fantastic Foods Co.",
            "Infinite Technologies",
            "Bright Ideas Group",
            "Swift Logistics Services",
            "HealthCare Innovations",
            "Smart Electronics Ltd.",
            "Creative Designs Agency",
            "Energy Powerhouse Inc.",
            "Secure Solutions Group",
            "Eco-Friendly Solutions Co.",
            "Financial Wizards LLC",
            "GreenTech Ventures",
            "Innovative Labs International",
            "Future Tech Enterprises",
            "Sunrise Hospitality Group",
            "Precision Manufacturing Co."
        ]

        employment_statuses = [
            "Full-time",
            "Part-time",
            "Contract",
            "Temporary",
            "Intern",
            "Freelance",
            "Self-employed",
            "Consultant",
            "Remote",
            "Student"
        ]

        curriculums = [Curriculum(
            cmo_no=f'CMO No. {_ - 1990}',
            description=fake.word(),
            start_year=f'{(_ - 5) + 1}',
            end_year=f'{_}',
        ) for _ in range(2005, 2030, 5)]
        Curriculum.objects.bulk_create(curriculums)

        for index, every_curricula in enumerate(curriculums):
            course_id_list = ['BSIT', 'BSA', 'BSAIS', 'ABELS', 'BTVTed', 'BSPA', 'BSE', 'BSSW', 'DHRS']
            courses_list =[]

            for course in course_id_list:
                new = Course(
                    curriculum=every_curricula,
                    course_id=f'{course}-{index+1}',
                    course_name=course,
                    course_desc=fake.text(),
                    no_units=random.randint(100, 300),
                )
                courses_list.append(new)
            
            Course.objects.bulk_create(courses_list)

        admin_address = Address.objects.create(
            country='Phillipines',
            region='Region 4A',
            province='Quezon',
            city='Lucena City',
            barangay='Cotta',
            zip_code="4301",
        )

        superuser = User.objects.create_superuser(username='admin', password='admin', first_name='Gem Rey')

        # admin_profile = AlumniProfile.objects.create(
        #     user=superuser,
        #     alumni_id='A0-0000',
        #     course=random.choice(courses_list),
        #     fname='Gem Rey',
        #     lname='Rañola',
        #     mi='B',
        #     sex='Male',
        #     contact_number='1234567890',
        #     religion='Roman Catholic',
        #     civil_status='Broken',
        #     date_of_birth='2002-07-13',
        #     facebook_account_name=f'Gem Rey B. Rañola',
        #     home_address=admin_address,
        # )

        # CurrentJob.objects.create(
        #         alumni=admin_profile,
        #         job_position=random.choice(job_positions),
        #         approximate_monthly_salary=random.randint(10000, 50000),
        #         company_affiliation=random.choice(company_affiliations),
        #         company_address=admin_address,
        #         employment_status=random.choice(employment_statuses),
        #         employed_within_6mo=random.choice([True, False]),
        #         promoted_in_current_job=random.choice([True, False]),
        #         getting_jobs_related_to_experience=random.choice([True, False])
        #     )
        
        print()
        print()  
        print('Admin Profile Generated', end='\n')
        print()
        print()


        province = ['Quezon', 'Batangas', 'Laguna']
        religion = ['Catholic', 'INC', 'Muslim']
        marital = ['Single', 'Married', 'Widowed']

        with open('ph-address.json') as json_file:
            data = json.load(json_file)

        region_codes = ['01', '02', '03', '4A', '4B', '05', '06', '07', '08', '09', '10', '11', '12', '13', 'BARMM', 'CAR', 'NCR']
        with transaction.atomic():
            for i in range(1462):
                first_name = fake.first_name()
                last_name = fake.last_name()
                middle_name = fake.random_letter()
                alumni_id = f'A0-{i+1:04d}'

                years = list(range(2001, 2024))
                num_choices = 10

                if i < 160:
                    year_range = list(range(2001, 2011))
                elif i < 606:
                    year_range = list(range(2011, 2016))
                elif i < 904:
                    year_range = list(range(2016, 2019))
                elif i < 1165:
                    year_range = list(range(2019, 2023))
                else:
                    year_range = list(range(2022, 2024))

                increasing_weights = [i / sum(range(1, len(year_range) + 1)) for i in range(1, len(year_range) + 1)]
                graduation_year = random.choices(year_range, weights=increasing_weights, k=3)[0]



                print(f'{i+1}.) {first_name} {last_name}')
                random.shuffle(region_codes)
                region_code = region_codes[0]

                if region_code in ['BARMM', 'CAR', 'NCR']:
                    region_name = region_code
                    province_name = random.choice(list(data[region_code]['province_list'].keys()))
                    province_data = data[region_code]['province_list'][province_name]
                    municipality_name = random.choice(list(province_data['municipality_list'].keys()))
                    municipality_data = province_data['municipality_list'][municipality_name]
                    barangay_name = random.choice(municipality_data['barangay_list'])
                elif region_code in ['4A', '4B']:
                    region_name = f'REGION {region_code}'
                    province_name = random.choice(list(data[region_code]['province_list'].keys()))
                    province_data = data[region_code]['province_list'][province_name]
                    municipality_name = random.choice(list(province_data['municipality_list'].keys()))
                    municipality_data = province_data['municipality_list'][municipality_name]
                    barangay_name = random.choice(municipality_data['barangay_list'])
                else:
                    region_data = data[region_code]
                    region_name = region_data['region_name']
                    province_name = random.choice(list(region_data['province_list'].keys()))
                    province_data = region_data['province_list'][province_name]
                    municipality_name = random.choice(list(province_data['municipality_list'].keys()))
                    municipality_data = province_data['municipality_list'][municipality_name]
                    barangay_name = random.choice(municipality_data['barangay_list'])

                address = Address.objects.create(
                    country='Phillipines',
                    region=region_name,
                    province=province_name,
                    city=municipality_name,
                    barangay=barangay_name,
                    zip_code=fake.zipcode(),
                )

                sex = ['Male', 'Female']
                sex_prob = [0.6, 0.4]
                
                alumni_profile = AlumniProfile.objects.create(
                    alumni_id=alumni_id,
                    course=None,
                    fname=first_name,
                    lname=last_name,
                    mi=middle_name,
                    sex=random.choices(sex, weights=sex_prob, k=1)[0],
                    contact_number=fake.phone_number(),
                    religion=random.choice(religion),
                    civil_status=random.choice(marital),
                    date_of_birth=fake.date_of_birth(),
                    facebook_account_name=f'{first_name} {middle_name.title()}. {last_name}',
                    home_address=address,
                )

                fake_word = [None, fake.word()]
                fake_word_prob = [0.8, 0.2]
                pursued_further_education = [True,False]
                pursued_further_education_prob = [0.1, 0.8]
                SATISFACTION_CHOICES = [None, 1, 2, 3, 4, 5]
                SATISFACTION_CHOICES_prob = [0.1, 0.2, 0.1, 0.3, 0.2, 0.1]

                graduate_info = GraduateInformation.objects.create(
                    alumni=alumni_profile,
                    year_graduated=graduation_year,
                    satisfaction_level=random.choices(SATISFACTION_CHOICES, weights=SATISFACTION_CHOICES_prob, k=1)[0],
                    pursued_further_education=random.choices(pursued_further_education, weights=pursued_further_education_prob, k=1)[0],
                    honor=random.choices(fake_word, weights=fake_word_prob, k=1)[0],
                )

                curriculum = graduate_info.curriculum
                if curriculum:
                    selected_course = random.choice(graduate_info.courses)
                    # Now you can use the selected_course as needed in your AlumniProfile creation logic
                    alumni_profile.course = selected_course
                    alumni_profile.save()

            

                def random_date(start_date, end_date):
                    if start_date >= end_date:
                        return end_date

                    time_delta = end_date - start_date
                    random_days = random.randint(0, time_delta.days)
                    random_date_result = start_date + timedelta(days=random_days)
                    return random_date_result
                
                start_year = 2000
                if graduation_year > 2021:
                    start_year = 2021

                start_date = datetime(start_year, 1, 1)
                end_date = datetime(2021, 12, 25)
                latest_employment_date = start_date 
                record_iterate = random.randint(0, 3)

                for k in range(record_iterate):
                    if record_iterate == 0:
                        break
                    else:
                        date_employed = random_date(latest_employment_date, end_date)
                        employement_record = EmploymentRecord.objects.create(
                            alumni=alumni_profile,
                            company_name=random.choice(company_affiliations),
                            employment_status=random.choice(employment_statuses),
                            approximate_monthly_salary=random.randint(5000, 150000),
                            date_employed=date_employed
                        )
                        latest_employment_date = date_employed
                    print('\trecord:', k + 1)

                
                random_current_jobs = [True, False]
                random_current_job_prob = [0.8, 0.2]
                random_current_job = random.choices(random_current_jobs, weights=random_current_job_prob, k=1)[0]

                employed_within_6mo_prob = [0.7, 0.3]
                employed_within_6mo = random.choices(random_current_jobs, weights=employed_within_6mo_prob, k=1)[0]
                getting_jobs_related_to_experience = random.choices(random_current_jobs, weights=employed_within_6mo_prob, k=1)[0]

                promoted_in_current_job_prob = [0.6, 0.4]
                promoted_in_current_job = random.choices(random_current_jobs, weights=promoted_in_current_job_prob, k=1)[0]


                company_name = random.choice(company_affiliations)
                employment_status = random.choice(employment_statuses)
                salary = random.randint(5000, 150000)


                def random_current_date(graduation_year):
                    if graduation_year > 2021:
                        start_year = 2021
                    else:
                        start_year = graduation_year
                    start_date = datetime(start_year, 1, 1)
                    end_date = datetime(2023, 12, 31)
                    time_delta = end_date - start_date
                    random_days = random.randint(0, time_delta.days)
                    random_date_result = start_date + timedelta(days=random_days)
                    return random_date_result

                if random_current_job:
                    print('\thave current job')
                    current_job = CurrentJob.objects.create(
                        alumni=alumni_profile,
                        job_position=random.choice(job_positions),
                        approximate_monthly_salary=salary,
                        company_affiliation=company_name,
                        company_address=address,
                        employment_status=employment_status,
                        employed_within_6mo=employed_within_6mo,
                        promoted_in_current_job=promoted_in_current_job,
                        getting_jobs_related_to_experience=getting_jobs_related_to_experience
                    )

                    EmploymentRecord.objects.create(
                        alumni=alumni_profile,
                        company_name=company_name,
                        employment_status=employment_status,
                        approximate_monthly_salary=salary,
                        date_employed=random_current_date(graduation_year),
                    )


                print()
                print()

        self.stdout.write(self.style.SUCCESS('Dummy data generation completed.'))
