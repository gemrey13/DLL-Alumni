import random
from django.core.management.base import BaseCommand
from datetime import datetime, timedelta
from faker import Faker
from api.models import JobApplication, JobCategory, Job, UserProfile, UserSkill
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

        sample_bios = [
            "Passionate about technology and innovation. I love coding, exploring new frameworks, and building software solutions. Constantly seeking opportunities to expand my knowledge in the ever-evolving tech world.",
            "An artistic soul with a love for colors and forms. I express my creativity through various mediums, from traditional painting to digital design. Every creation tells a story, and I enjoy bringing imagination to life.",
            "Driven marketing professional with a flair for strategy and creativity. Experienced in crafting compelling campaigns that resonate with target audiences. A data enthusiast, I analyze trends to shape impactful marketing initiatives.",
            "Adventure seeker and nature enthusiast. Whether it's scaling mountains, trekking through forests, or exploring hidden gems, I thrive on discovering the beauty of our planet. Outdoor activities and a spirit for exploration define my lifestyle."
        ]

        sex = ['Male', 'Female']

        job_categories = [
            "Programming",
            "Graphic Design",
            "Digital Marketing",
            "Data Science",
            "Customer Support",
            "Project Management",
            "Sales",
            "Human Resources",
            "Finance",
            "Healthcare",
            "Education",
            "Engineering",
            "Retail",
            "Hospitality",
        ]

        job_descriptions = [
            "Software Engineer: Design, develop, and maintain software applications, analyze user needs, and implement efficient solutions.",
            "Marketing Specialist: Plan and execute marketing campaigns, analyze market trends, and develop strategies to promote products/services.",
            "Data Analyst: Collect and analyze data, create reports, and provide insights to support business decision-making.",
            "Graphic Designer: Create visual concepts, design layouts, and produce high-quality graphics for various marketing materials.",
            "Financial Analyst: Conduct financial analysis, prepare budgets, and provide recommendations to improve financial performance.",
            "Customer Support Representative: Assist customers with inquiries, resolve issues, and provide excellent service via phone, email, or chat.",
            "Project Manager: Plan, execute, and oversee projects, manage resources, and ensure successful project delivery within deadlines."
        ]
        
        locations = [
            "New York, NY",
            "San Francisco, CA",
            "London, UK",
            "Tokyo, Japan",
            "Sydney, Australia",
            "Berlin, Germany",
            "Toronto, Canada",
            "Singapore",
            "Mumbai, India",
            "Dubai, UAE",
            "São Paulo, Brazil"
        ]
        
        course_list = ['BSIT', 'BSA', 'BSAIS', 'ABELS', 'BTVTed', 'BSPA', 'BSE', 'BSSW', 'DHRS']

        User.objects.create_superuser(
            username='admin', 
            password='admin', 
            first_name='Gem Rey', 
            last_name='Rañola', 
            email='gemreyranola@gmail.com')

        print('Admin Profile Generated', end='\n\n\n')

        categories = [JobCategory(
            name=i
        ) for i in job_categories]
        JobCategory.objects.bulk_create(categories)




        with transaction.atomic():
            for job in range(1, 50):

                first_name = fake.first_name()
                last_name = fake.last_name()
                username = f'{first_name}_{last_name}'
                email = f'{first_name}{last_name}_{job}@gmail.com'

                user = User.objects.create(
                    username=username,
                    password='123',
                    first_name=first_name,
                    last_name=last_name,
                    email=email
                )

                user_profile, created = UserProfile.objects.get_or_create(
                    user=user,
                    defaults={
                        'bio': random.choice(sample_bios),
                        'sex': random.choice(sex),
                        'course': random.choice(course_list),
                    }
                )

                if not created:
                    # UserProfile already exists, update fields if needed
                    user_profile.bio = random.choice(sample_bios)
                    user_profile.sex = random.choice(sex)
                    user_profile.course = random.choice(course_list)
                    user_profile.save()

                user_skills = [random.choice(categories) for _ in range(random.randint(1, 4))]
                user_profile.skills.set(user_skills)
            
            users = User.objects.all()

            for _ in range(1, 41):
                new_job = Job.objects.create(
                    posted_by=random.choice(users),
                    title=random.choice(job_positions),
                    company_name=random.choice(company_affiliations),
                    starting_salary=random.randint(10000,60000),
                    description=random.choice(job_descriptions),
                    location=random.choice(locations),
                    is_approved_by_admin=True,
                    Job_type=random.choice(employment_statuses),
                    experience_level=random.choice([1, 2, 3]),
                )
                new_job_categories = [random.choice(categories) for _ in range(random.randint(1, 4))]
                new_job.category.set(new_job_categories)

            jobs = Job.objects.filter(is_approved_by_admin=True)

            for _ in range(1, 21):
                random_job = random.choice(jobs)
                random_user = random.choice(users)

                existing_application = JobApplication.objects.filter(job=random_job, user=random_user).exists()
                if  not existing_application:
                    JobApplication.objects.create(
                        job=random_job,
                        user=random_user
                    )


        self.stdout.write(self.style.SUCCESS('Dummy data generation completed.'))
