from django.db import models
from django.contrib.auth.models import User

class Address(models.Model):
    country = models.CharField(max_length=80)
    region = models.CharField(max_length=80, blank=True)
    province = models.CharField(max_length=80, blank=True)
    city = models.CharField(max_length=80, blank=True)
    barangay = models.CharField(max_length=80, blank=True)
    zip_code = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return f'{self.country.title()}, {self.region.title()}, {self.province.title()}, {self.city.title()}, {self.barangay.title()}'
    
class AlumniProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    alumni_id = models.CharField(primary_key=True, max_length=6)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    fname = models.CharField(max_length=64)
    lname = models.CharField(max_length=64)
    mi = models.CharField(max_length=2, blank=True, null=True)
    suffix = models.CharField(max_length=3, blank=True, null=True)
    sex = models.CharField(max_length=10)
    contact_number = models.CharField(max_length=11)
    religion = models.CharField(max_length=64)
    marital_status = models.CharField(max_length=64)
    date_of_birth = models.DateField()
    facebook_account_name = models.CharField(max_length=80)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'ID: {self.alumni_id} - {self.fname} {self.lname}'
    
class Certification(models.Model):
    title = models.CharField(max_length=64)
    date_of_certification = models.DateField()

class Affiliation(models.Model):
    name_of_organization = models.CharField(max_length=64)
    position = models.CharField(max_length=64)

class GraduateInformation(models.Model):
    alumni = models.OneToOneField(AlumniProfile, on_delete=models.CASCADE, primary_key=True)
    graduation_date = models.DateField()
    certification = models.ForeignKey(Certification, on_delete=models.CASCADE, null=True)
    affiliation = models.ForeignKey(Affiliation, on_delete=models.CASCADE, null=True)
    honor = models.CharField(max_length=64)

class Curriculum(models.Model):
    cmo_no = models.CharField(primary_key=True, max_length=10)
    description = models.CharField(max_length=64)
    curriculum_year = models.IntegerField()

    def __str__(self):
        return self.cmo_no

class Course(models.Model):
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE, related_name='courses')
    course_id = models.CharField(primary_key=True, max_length=8)
    course_name = models.CharField(max_length=64)
    course_desc = models.CharField(max_length=255)
    field_type = models.CharField(max_length=64)
    no_units = models.IntegerField()

    def __str__(self):
        return f'{self.curriculum} | {self.course_id}'
    
    @property
    def alumni_count(self):
        return AlumniProfile.objects.filter(course=self).count()

class CurrentJob(models.Model):
    alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE)
    job_type = models.CharField(max_length=64)
    job_title = models.CharField(max_length=64)
    salary = models.IntegerField()
    start_date = models.DateField()
    company_name = models.CharField(max_length=64)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'{self.alumni.fname} {self.alumni.lname} - {self.job_title}'

class PreviousJob(models.Model):
    alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE)
    job_type = models.CharField(max_length=64)
    job_title = models.CharField(max_length=64)
    salary = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    company_name = models.CharField(max_length=64)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'{self.alumni.fname} {self.alumni.lname} - {self.job_title}'