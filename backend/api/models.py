from django.db import models
from django.contrib.auth.models import User



class JobCategory(models.Model):
    name = models.CharField(max_length=255 unique=True)

    def __str__(self):
        return self.name
    

class Job(models.Model):
    title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=100)
    description = models.TextField()
    requirements = models.TextField()
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)
    category = models.ForeignKey(JobCategory, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title


class JobApplication(models.Model):
    job = models.ForeignKey(Job, related_name='applications', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Application for {self.job.title} by {self.user.username}"

    class Meta:
        unique_together = ('job', 'user')




class Address(models.Model):
    country = models.CharField(max_length=80)
    region = models.CharField(max_length=80, blank=True)
    province = models.CharField(max_length=80, blank=True)
    city = models.CharField(max_length=80, blank=True)
    barangay = models.CharField(max_length=80, blank=True)
    zip_code = models.CharField(max_length=10, blank=True)
    address_type = models.CharField(max_length=80, blank=True)

    def __str__(self):
        return f'{self.country.title()}, {self.region.title()}, {self.province.title()}, {self.city.title()}, {self.barangay.title()}'
    
class AlumniProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    alumni_id = models.CharField(primary_key=True, max_length=10)
    course = models.ForeignKey('Course', on_delete=models.CASCADE, null=True)
    fname = models.CharField(max_length=64)
    lname = models.CharField(max_length=64)
    mi = models.CharField(max_length=2, blank=True, null=True)
    sex = models.CharField(max_length=10)
    contact_number = models.CharField(max_length=11)
    religion = models.CharField(max_length=64)
    civil_status = models.CharField(max_length=64)
    date_of_birth = models.DateField()
    facebook_account_name = models.CharField(max_length=80)
    home_address = models.ForeignKey(Address, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'ID: {self.alumni_id} - {self.fname} {self.lname}'
    

class GraduateInformation(models.Model):
    SATISFACTION_CHOICES = (
        (5, 'Very Satisfied'),
        (4, 'Satisfied'),
        (3, 'Neutral'),
        (2, 'Dissatisfied'),
        (1, 'Very Dissatisfied'),
    )

    alumni = models.OneToOneField(AlumniProfile, on_delete=models.CASCADE, primary_key=True)
    year_graduated = models.IntegerField()
    satisfaction_level = models.IntegerField(choices=SATISFACTION_CHOICES, blank=True, null=True)
    pursued_further_education = models.BooleanField(default=False)
    honor = models.CharField(max_length=64, blank=True, null=True)

    @property
    def curriculum(self):
        try:
            curriculum = Curriculum.objects.get(
                start_year__lte=self.year_graduated,
                end_year__gte=self.year_graduated
            )
            return curriculum
        except Curriculum.DoesNotExist:
            return None

    @property
    def courses(self):
        curriculum = self.curriculum
        if curriculum:
            return curriculum.courses.all()
        else:
            return []
        
    def __str__(self):
        return f'{self.alumni} - Grad year:{self.year_graduated}'

class Curriculum(models.Model):
    cmo_no = models.CharField(primary_key=True, max_length=10)
    description = models.CharField(max_length=64)
    start_year = models.IntegerField()
    end_year = models.IntegerField()

    def __str__(self):
        return f'{self.cmo_no}({self.start_year}-{self.end_year})'

class Course(models.Model):
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE, related_name='courses')
    course_id = models.CharField(primary_key=True, max_length=8)
    course_name = models.CharField(max_length=64)
    course_desc = models.CharField(max_length=255)
    no_units = models.IntegerField()

    def __str__(self):
        return f'{self.curriculum} | {self.course_id}'
    
    @property
    def alumni_count(self):
        return AlumniProfile.objects.filter(course=self).count()

class CurrentJob(models.Model):
    alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE, related_name='current_job')
    job_position = models.CharField(max_length=64)
    approximate_monthly_salary = models.IntegerField()
    company_affiliation = models.CharField(max_length=64)
    company_address = models.ForeignKey(Address, on_delete=models.CASCADE, blank=True, null=True)
    employment_status = models.CharField(max_length=64) 
    employed_within_6mo = models.BooleanField(default=False)
    promoted_in_current_job = models.BooleanField(default=False)
    getting_jobs_related_to_experience = models.BooleanField(default=False)


    def __str__(self):
        return f'{self.alumni}- {self.job_position}'

class EmploymentRecord(models.Model):
    alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE, related_name='employment_record')
    company_name = models.CharField(max_length=64)
    employment_status = models.CharField(max_length=64)
    approximate_monthly_salary = models.IntegerField()
    date_employed = models.DateField()

    def __str__(self):
        return f'{self.alumni} - {self.company_name}, {self.employment_status}'