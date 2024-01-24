import random
from django.core.management.base import BaseCommand
from datetime import datetime, timedelta
from faker import Faker
from api.models import (
    JobApplication,
    JobCategory,
    Job,
    UserProfile,
    UserEducation,
    UserJob,
    Language,
    AccountLink,
    UserWorkExperience,
)
from django.contrib.auth.models import User
import numpy as np
import json
from django.db import transaction

fake = Faker()


class Command(BaseCommand):
    help = "Generate dummy data for testing purposes"

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Generating dummy job data..."))

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
            "Web Developer",
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
            "Precision Manufacturing Co.",
        ]

        employment_statuses = [
            "Full-time",
            "Part-time",
            "Contract",
            "Temporary",
            "Internships",
            "Remote",
        ]

        school_names = [
            "Maplewood High School",
            "Greenfield Elementary School",
            "Pinecrest Middle School",
            "Riverside Academy",
            "Sunset Hills Elementary",
            "Meadowbrook High School",
            "Lakeview Junior High",
            "Hilltop Elementary",
            "Valley Forge High School",
            "Springfield Middle School",
        ]

        sample_bios = [
            "Passionate about technology and innovation. I love coding, exploring new frameworks, and building software solutions. Constantly seeking opportunities to expand my knowledge in the ever-evolving tech world.",
            "An artistic soul with a love for colors and forms. I express my creativity through various mediums, from traditional painting to digital design. Every creation tells a story, and I enjoy bringing imagination to life.",
            "Driven marketing professional with a flair for strategy and creativity. Experienced in crafting compelling campaigns that resonate with target audiences. A data enthusiast, I analyze trends to shape impactful marketing initiatives.",
            "Adventure seeker and nature enthusiast. Whether it's scaling mountains, trekking through forests, or exploring hidden gems, I thrive on discovering the beauty of our planet. Outdoor activities and a spirit for exploration define my lifestyle.",
        ]

        sex = ["Male", "Female"]

        languages_list = [
            "Tagalog",
            "English",
            "Spanish",
            "French",
            "German",
            "Mandarin Chinese",
            "Japanese",
            "Korean",
            "Arabic",
            "Russian",
            "Portuguese",
            "Italian",
            "Hindi",
            "Swahili",
            "Dutch",
            "Swedish",
            "Farsi (Persian)",
            "Turkish",
            "Vietnamese",
            "Thai",
            "Bahasa Indonesia",
            "Malay",
            "Filipino",
            "Cebuano",
            "Ilocano",
        ]

        school_years = [
            "2021-2022",
            "2020-2021",
            "2019-2020",
            "2018-2019",
            "2017-2018",
            "2016-2017",
            "2015-2016",
            "2014-2015",
            "2013-2014",
            "2012-2013",
            "2011-2012",
            "2010-2011",
        ]

        descriptions = [
            "I am currently a college student with a focus on marketing. My coursework has provided me with a solid understanding of market trends, and I have applied this knowledge to practical projects. I am eager to contribute my creative and strategic thinking to a marketing role.",
            "My academic background is in civil engineering, and I am actively involved in hands-on projects related to structural design and construction. While I am still in college, my commitment to excellence and problem-solving skills make me a valuable asset to any engineering team.",
            "As a student in environmental engineering, my coursework has equipped me with the skills to address environmental challenges. I have actively participated in projects related to sustainability and conservation. I am eager to contribute to initiatives that prioritize environmental responsibility.",
            "I am pursuing a degree in nursing and have completed practical training in healthcare settings. My passion for patient care and my commitment to learning and adapting in dynamic environments position me as a dedicated and compassionate nursing student.",
            "I am a student majoring in sociology, and my coursework has provided me with a deep understanding of social structures and dynamics. I have actively engaged in community-based projects to apply my theoretical knowledge to real-world situations.",
            "My focus is on entrepreneurship and business analytics. Despite being in college, I have already developed and implemented data-driven strategies for small business ventures. I am excited to further refine my skills and contribute to the business world.",
            "I am a college student specializing in supply chain management. My coursework has equipped me with the knowledge of optimizing logistics and streamlining operations. I am eager to contribute my skills to organizations looking to enhance their supply chain processes.",
            "As a student majoring in criminal justice, I have gained a comprehensive understanding of the legal system and law enforcement. I am committed to social justice and am eager to apply my knowledge to contribute to a safer and more just society.",
            "I am currently pursuing a degree in medical laboratory science. Despite being in the early stages of my academic journey, I have gained practical experience in laboratory settings. I am eager to contribute to advancements in medical diagnostics and research.",
            "My academic focus is on human resources management. Through coursework and internships, I have developed a strong foundation in HR practices. I am eager to bring my interpersonal skills and organizational knowledge to a professional HR setting.",
            "I am a student with a concentration in finance. While I am still in college, I have actively engaged in financial analysis projects, honing my skills in budgeting and financial modeling. I am excited to contribute my analytical mindset to finance roles.",
            "In the field of architecture, I am a student with a passion for innovative design and sustainable practices. My coursework has provided me with a strong foundation in architectural principles, and I am eager to contribute to projects that prioritize both aesthetics and functionality.",
            "I am currently majoring in mobile app development. Despite being a student, I have successfully completed app development projects, showcasing my proficiency in programming languages. I am excited to apply my skills to contribute to the ever-evolving mobile technology landscape.",
            "My academic focus is on project management. Through coursework and practical projects, I have developed strong organizational and leadership skills. I am eager to contribute to the successful execution of projects in a professional setting.",
        ]

        specialties = [
            # Technology Fields
            "Web Development",
            "Data Science",
            "Cybersecurity",
            "Mobile App Development",
            "Network Administration",
            "Software Engineering",
            "Database Management",
            # Non-Technology Fields
            "Public Administration",
            "Accounting",
            "Marketing",
            "Human Resources Management",
            "Project Management",
            "Finance",
            # Construction and Engineering
            "Civil Engineering",
            "Architecture",
            "Construction Management",
            "Environmental Engineering",
            # Health Sciences
            "Nursing",
            "Physical Therapy",
            "Medical Laboratory Science",
            # Social Sciences
            "Psychology",
            "Sociology",
            "Criminal Justice",
            # Business
            "Entrepreneurship",
            "Business Analytics",
            "Supply Chain Management",
        ]

        courses = [
            "Bachelor of Science in Information Technology",
            "Bachelor of Computer Science",
            "Bachelor of Information Systems",
            "Bachelor of Software Engineering",
            "Bachelor of Cybersecurity",
            "Bachelor of Data Science",
            "Bachelor of Business Information Systems",
            "Bachelor of Computer Engineering",
            "Bachelor of Network Administration",
            "Bachelor of Mobile App Development",
        ]

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
            "Software Engineer: Design, develop, and maintain scalable software solutions. Collaborate with cross-functional teams to analyze project requirements and implement efficient coding practices. Troubleshoot and debug applications, ensuring optimal performance and user experience.",
            "Marketing Manager: Develop comprehensive marketing strategies to enhance brand visibility and drive customer engagement. Analyze market trends, conduct competitor research, and identify opportunities for growth. Oversee the execution of integrated marketing campaigns across various channels, including digital and traditional media.",
            "Data Scientist: Leverage statistical methods and machine learning techniques to extract actionable insights from complex datasets. Build predictive models for forecasting and trend analysis. Collaborate with business stakeholders to communicate findings effectively and contribute to data-driven decision-making.",
            "Human Resources Specialist: Manage end-to-end recruitment processes, from job posting to candidate selection. Conduct employee onboarding programs, ensuring a smooth transition for new hires. Address HR-related inquiries, administer benefits, and contribute to the development of HR policies.",
            "Project Manager: Lead and coordinate project teams to ensure successful project delivery within scope, time, and budget constraints. Develop and maintain project plans, identifying risks and implementing mitigation strategies. Foster effective communication among team members and stakeholders.",
            "Graphic Designer: Conceptualize and create visually appealing designs for various marketing materials, including digital and print assets. Collaborate with clients to understand design requirements and deliver creative solutions. Stay updated on design trends and technologies.",
            "Customer Support Representative: Provide exceptional customer service by addressing product inquiries, resolving issues, and ensuring customer satisfaction. Collaborate with internal teams to escalate and resolve complex problems. Continuously identify areas for process improvement to enhance the overall customer experience.",
            "Operations Manager: Streamline internal processes to optimize efficiency and productivity. Oversee day-to-day operations, including supply chain management, resource allocation, and quality control. Implement strategic initiatives to improve operational performance and achieve organizational goals.",
            "Sales Representative: Identify and pursue sales opportunities, building and maintaining strong client relationships. Analyze market trends, customer needs, and competitor activities to position products effectively. Achieve and exceed sales targets through effective negotiation and communication skills.",
            "Financial Analyst: Conduct financial analysis, prepare budgets, and provide recommendations to improve financial performance. Analyze market trends and economic conditions to support strategic decision-making. Collaborate with various departments to ensure accurate financial reporting.",
            "Network Administrator: Manage and maintain computer networks, ensuring smooth operation and security. Install, support, and manage the networks and computer systems within an organization. Troubleshoot network and system issues, and implement necessary upgrades and improvements.",
            "Content Writer: Develop engaging and relevant content for various platforms, including websites, blogs, and social media. Research industry trends and create content strategies to reach target audiences. Collaborate with marketing teams to align content with overall brand messaging.",
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
            "São Paulo, Brazil",
        ]

        course_list = [
            "BSIT",
            "BSA",
            "BSAIS",
            "ABELS",
            "BTVTed",
            "BSPA",
            "BSE",
            "BSSW",
            "DHRS",
        ]

        account_links = [
            "https://www.facebook.com/user123",
            "https://www.twitter.com/user123",
            "https://www.linkedin.com/in/user123",
            "https://www.instagram.com/user123",
            "https://www.github.com/user123",
            "https://www.pinterest.com/user123",
            "https://www.snapchat.com/add/user123",
            "https://www.tiktok.com/@user123",
            "https://www.reddit.com/user/user123",
            "https://www.behance.net/user123",
            "https://www.youtube.com/user/user123",
            "https://www.medium.com/@user123",
            "https://www.twitch.tv/user123",
            "https://www.spotify.com/user/user123",
        ]

        work_experience = [
            "Managed customer service inquiries and resolved issues promptly. Utilized effective communication skills to address customer concerns and enhance overall satisfaction. Implemented a new ticketing system, resulting in a 20% reduction in response time.",
            "Developed and implemented marketing strategies to increase sales. Conducted market research to identify opportunities and devised targeted campaigns. Collaborated with the sales team to analyze customer feedback and adjust strategies accordingly.",
            "Coordinated and led team meetings to discuss project progress. Facilitated open communication among team members, fostering a collaborative work environment. Monitored project timelines and identified potential roadblocks, implementing proactive solutions.",
            "Performed data analysis to identify trends and insights. Utilized tools such as Python and SQL to extract and analyze data. Generated comprehensive reports for stakeholders, informing strategic decision-making processes.",
            "Provided technical support for software applications. Assisted end-users with troubleshooting and problem-solving. Collaborated with the development team to communicate user feedback and improve software functionality.",
            "Conducted training sessions for new employees on company policies. Developed training materials and conducted orientation sessions for new hires. Ensured a smooth onboarding process, contributing to high employee satisfaction rates.",
            "Collaborated with cross-functional teams to deliver successful projects. Worked closely with departments such as marketing, sales, and development to ensure cohesive project execution. Facilitated effective communication and resource allocation.",
            "Streamlined internal processes, resulting in improved efficiency. Conducted process audits and identified areas for improvement. Implemented changes that reduced workflow bottlenecks and enhanced overall productivity.",
            "Handled financial reporting and budgeting for the department. Prepared monthly financial statements and analyzed variances. Collaborated with the finance team to develop annual budgets and forecasts.",
            "Led a team of developers in the creation of a new software product. Managed project timelines, allocated resources, and ensured adherence to quality standards. Coordinated testing and feedback cycles, leading to a successful product launch.",
            "Implemented a customer relationship management (CRM) system to enhance client interactions. Trained sales and support teams on CRM usage and customization. Increased customer satisfaction by 25% through improved communication and personalized service.",
            "Developed and executed social media campaigns to boost brand awareness. Monitored engagement metrics and adjusted strategies for optimal results. Increased social media following by 30% within six months, contributing to overall brand growth.",
        ]

        work_locations = [
            "Manila, Philippines",
            "Cebu City, Philippines",
            "Quezon City, Philippines",
            "Davao City, Philippines",
            "Makati City, Philippines",
            "Taguig City, Philippines",
            "Pasig City, Philippines",
            "Cagayan de Oro, Philippines",
            "Iloilo City, Philippines",
            "Baguio City, Philippines",
            "Antipolo City, Philippines",
            "Zamboanga City, Philippines",
        ]

        categories = [JobCategory(name=i) for i in job_categories]

        languages = [Language.objects.create(name=i) for i in languages_list]

        JobCategory.objects.bulk_create(categories)

        with transaction.atomic():
            for job in range(1, 100):
                first_name = fake.first_name()
                last_name = fake.last_name()
                username = f"{first_name}_{last_name}_{job}"
                email = f"{first_name}{last_name}_{job}@gmail.com"

                user = User.objects.create_user(
                    username=username,
                    password="123",
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                )

                for _ in range(random.randint(1, 4)):
                    AccountLink.objects.create(
                        user=user, link=random.choice(account_links)
                    )

                user_education = UserEducation.objects.create(
                    user=user,
                    school_name=random.choice(school_names),
                    course=random.choice(courses),
                    school_year=random.choice(school_years),
                )

                user_work_exprience = UserWorkExperience.objects.create(
                    user=user, content=random.choice(work_experience)
                )

                user_job = UserJob.objects.create(
                    user=user,
                    specialty=random.choice(specialties),
                    description=random.choice(descriptions),
                )

                user_profile, created = UserProfile.objects.get_or_create(
                    user=user,
                    defaults={
                        "bio": random.choice(sample_bios),
                        "sex": random.choice(sex),
                        "course": random.choice(course_list),
                        "location": random.choice(work_locations),
                    },
                )

                if not created:
                    user_profile.bio = random.choice(sample_bios)
                    user_profile.sex = random.choice(sex)
                    user_profile.course = random.choice(course_list)
                    user_profile.location = random.choice(work_locations)
                    user_profile.save()

                user_skills = [
                    random.choice(categories) for _ in range(random.randint(1, 4))
                ]

                user_languages = [
                    random.choice(languages) for _ in range(random.randint(1, 4))
                ]

                user_profile.save()

                user_profile.skills.set(user_skills)
                user_profile.languages.set(user_languages)

            users = User.objects.all()

            for _ in range(1, 81):
                new_job = Job.objects.create(
                    posted_by=random.choice(users),
                    title=random.choice(job_positions),
                    company_name=random.choice(company_affiliations),
                    starting_salary=random.randint(10000, 60000),
                    description=random.choice(job_descriptions),
                    location=random.choice(locations),
                    is_approved_by_admin=True,
                    Job_type=random.choice(employment_statuses),
                    experience_level=random.choice([1, 2, 3]),
                )
                new_job_categories = [
                    random.choice(categories) for _ in range(random.randint(1, 4))
                ]
                new_job.category.set(new_job_categories)

            jobs = Job.objects.filter(is_approved_by_admin=True)

            for _ in range(1, 154):
                random_job = random.choice(jobs)
                random_user = random.choice(users)

                existing_application = JobApplication.objects.filter(
                    job=random_job, user=random_user
                ).exists()
                if not existing_application:
                    JobApplication.objects.create(job=random_job, user=random_user)

        self.stdout.write(self.style.SUCCESS("Dummy data jobs record completed."))
