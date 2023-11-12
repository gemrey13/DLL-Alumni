from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission


class CustomUserManager(BaseUserManager):

    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    groups = models.ManyToManyField(Group, blank=True, related_name='customuser_set')  # Add related_name
    user_permissions = models.ManyToManyField(Permission, blank=True, related_name='customuser_set')

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Country(models.Model):
    country_name = models.CharField(max_length=64)

    def __str__(self):
        return self.country_name.title()


class Region(models.Model):
    region_name = models.CharField(max_length=64)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.region_name.title()


class Province(models.Model):
    province_name = models.CharField(max_length=64)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)

    def __str__(self):
        return self.province_name.title()


class City(models.Model):
    city_name = models.CharField(max_length=64)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)

    def __str__(self):
        return self.city_name.title()


class Barangay(models.Model):
    barangay_name = models.CharField(max_length=64)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def __str__(self):
        return self.barangay_name.title()
    

class Address(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    barangay = models.ForeignKey(Barangay, on_delete=models.CASCADE)
    street = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f'{self.country}, {self.region}, {self.province}, {self.city}'
    

class AlumniProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, blank=True, null=True)
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
    address = models.ForeignKey(Address, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'ID: {self.alumni_id} - {self.fname} {self.lname}'


class GraduateInformation(models.Model):
    alumni = models.OneToOneField(AlumniProfile, on_delete=models.CASCADE, primary_key=True)
    graduation_date = models.DateField()
    honor = models.CharField(max_length=64)


class Curriculum(models.Model):
    cmo_no = models.CharField(primary_key=True, max_length=10)
    description = models.CharField(max_length=64)
    curriculum_year = models.IntegerField()

    def __str__(self):
        return self.cmo_no


class Course(models.Model):
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE)
    course_id = models.CharField(primary_key=True, max_length=8)
    course_name = models.CharField(max_length=64)
    course_desc = models.CharField(max_length=255)
    field_type = models.CharField(max_length=64)
    no_units = models.IntegerField()

    def __str__(self):
        return self.course_id
    
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


