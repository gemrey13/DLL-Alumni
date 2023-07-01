from datetime import date
from django.contrib.auth.models import User
from django.db import models


FIELD_CHOICES = [
        ('technology', 'Technology'),
        ('medical', 'Medical/Healthcare'),
        ('mechanical', 'Mechanical Engineering'),
        ('electrical', 'Electrical Engineering'),
        ('finance', 'Finance/Accounting'),
        ('education', 'Education/Teaching'),
        ('marketing', 'Marketing/Advertising'),
        ('sales', 'Sales'),
        ('business', 'Business Development'),
        ('hr', 'Human Resources'),
        ('law', 'Law/Legal'),
        ('consulting', 'Consulting'),
        ('manufacturing', 'Manufacturing'),
        ('hospitality', 'Hospitality/Travel'),
        ('retail', 'Retail'),
        ('media', 'Media/Entertainment'),
        ('art', 'Art/Design'),
        ('architecture', 'Architecture'),
        ('nonprofit', 'Nonprofit/Volunteering'),
        ('government', 'Government/Public Administration'),
    ]


SEX_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female')
    ]



class Country(models.Model):
    country_name = models.CharField(max_length=64)

    def __str__(self):
        return self.country_name


class Province(models.Model):
    province_name = models.CharField(max_length=64)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.province_name


class City(models.Model):
    city_name = models.CharField(max_length=64)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)

    def __str__(self):
        return self.city_name


class Barangay(models.Model):
    barangay_name = models.CharField(max_length=64)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def __str__(self):
        return self.barangay_name
    
class Curriculum(models.Model):
    curriculum_id = models.CharField(max_length=6, primary_key=True)
    curriculum_name = models.CharField(max_length=255, blank=False)
    description = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    year = models.CharField(max_length=4, blank=False)

    def __str__(self):
        return self.curriculum_name

class Course(models.Model):
    course_id = models.CharField(max_length=6, primary_key=True)
    course_name = models.CharField(max_length=64, blank=False)
    course_desc = models.CharField(max_length=255, blank=True)
    field_type = models.CharField(max_length=64, choices=FIELD_CHOICES, default='technology')
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.course_id}'


class AlumniProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    alumni_id = models.CharField(primary_key=True, max_length=6)
    fname = models.CharField(max_length=64)
    lname = models.CharField(max_length=64)
    mi = models.CharField(max_length=2, blank=True)
    suffix = models.CharField(max_length=3, blank=True)
    sex = models.CharField(max_length=10, choices=SEX_CHOICES)
    religion = models.CharField(max_length=64)
    marital_status = models.CharField(max_length=64)
    date_of_birth = models.DateField()

    def __str__(self):
        return f'{self.alumni_id} | {self.fname} {self.lname}'

    def age(self):
        today = date.today()
        age = today.year - self.date_of_birth.year
        if today.month < self.date_of_birth.month or (today.month == self.date_of_birth.month and today.day < self.date_of_birth.day):
            age -= 1
        return age


class AlumniAddress(models.Model):
    alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    barangay = models.ForeignKey(Barangay, on_delete=models.CASCADE)
    street = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.street}, {self.barangay}, {self.city}, {self.province}, {self.country}'


class JobAddress(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    barangay = models.ForeignKey(Barangay, on_delete=models.CASCADE)
    street = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.street}, {self.barangay}, {self.city}, {self.province}, {self.country}'



class CurrentJob(models.Model):
    current_job_id = models.CharField(primary_key=True, max_length=6)
    job_type = models.CharField(max_length=64, choices=FIELD_CHOICES, default='technology')
    job_title = models.CharField(max_length=64)
    salary = models.IntegerField()
    start_date = models.DateField()
    company_name = models.CharField(max_length=64)
    alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE, null=True, blank=True)
    address = models.ForeignKey(JobAddress, on_delete=models.CASCADE)


    def __str__(self):
        return f'{self.current_job_id} {self.job_title} {self.alumni}'

class PreviousJob(models.Model):
    previous_job_id = models.CharField(primary_key=True, max_length=10)
    job_type = models.CharField(max_length=64, choices=FIELD_CHOICES, default='technology')
    job_title = models.CharField(max_length=64)
    salary = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    company_name = models.CharField(max_length=64)
    alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE, null=True, blank=True)
    address = models.ForeignKey(JobAddress, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.alumni}'


class EmploymentRecord(models.Model):
    employment_record_id = models.CharField(primary_key=True, max_length=10)
    job_type = models.CharField(max_length=64, choices=FIELD_CHOICES, default='current')
    job_title = models.CharField(max_length=64)
    salary = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    company_name = models.CharField(max_length=64)
    alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE, null=True, blank=True)
    address = models.ForeignKey(JobAddress, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.alumni}'





class Graduate(models.Model):
    graduate_id = models.CharField(max_length=6, primary_key=True)
    alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    graduation_date = models.DateField()
    honor = models.CharField(max_length=64, blank=True)

