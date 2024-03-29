from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import (
    AlumniProfile,
    GraduateInformation,
    Curriculum,
    Course,
    CurrentJob,
    EmploymentRecord,
    Address,
    Job,
    JobCategory,
    UserProfile,
    UserJob,
    UserEducation,
    AccountLink,
    UserSkill,
    UserWorkExperience,
    Language,
    News,
    Event,
    SystemUpdate
)


class SystemUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemUpdate
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    num_participants = serializers.SerializerMethodField()
    participants_names = serializers.SerializerMethodField()

    def get_participants_names(self, obj):
        participants = obj.participants.all()
        names = [
            {
                "first_name": participant.user.first_name,
                "last_name": participant.user.last_name,
                "email": participant.user.email,
                "username": participant.user.username,
            }
            for participant in participants
        ]
        return names

    def get_num_participants(self, obj):
        return len(obj.participants.all())

    class Meta:
        model = Event
        fields = "__all__"


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = "__all__"


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = "__all__"


class UserJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserJob
        fields = "__all__"


class UserEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEducation
        fields = "__all__"


class AccountLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountLink
        fields = "__all__"


class UserWorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorkExperience
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["location", "bio", "sex", "languages", "skills"]


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "first_name", "last_name"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )
        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.email = validated_data.get("email", instance.email)
        instance.username = validated_data.get("username", instance.username)

        password = validated_data.get("password")
        if password:
            instance.set_password(password)

        instance.save()
        return instance


class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = ["name"]


class JobListSerializer(serializers.ModelSerializer):
    posted_by = serializers.CharField(source="posted_by.username", read_only=True)
    category = serializers.StringRelatedField(many=True, read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    num_applicants = serializers.SerializerMethodField()
    applicants_names = serializers.SerializerMethodField()

    def get_applicants_names(self, obj):
        applicants = obj.applications.all()
        names = [
            {
                "first_name": applicant.user.first_name,
                "last_name": applicant.user.last_name,
                "email": applicant.user.email,
                "username": applicant.user.username,
            }
            for applicant in applicants
        ]
        return names

    def get_num_applicants(self, obj):
        return len(obj.applications.all())

    class Meta:
        model = Job
        fields = "__all__"


class UserDetailSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    num_posted_jobs = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "date_joined",
            "num_posted_jobs",
        ]

    def get_num_posted_jobs(self, obj):
        return obj.job_set.count()


class JobItemDetailsSerializer(serializers.ModelSerializer):
    posted_by = serializers.CharField(source="posted_by.username", read_only=True)
    category = serializers.StringRelatedField(many=True, read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    num_applicants = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Job
        fields = "__all__"

    def get_num_applicants(self, obj):
        return obj.applications.all().count()


class JobSerializer(serializers.ModelSerializer):
    category = JobCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = [
            "id",
            "posted_by",
            "title",
            "company_name",
            "starting_salary",
            "description",
            "location",
            "created_at",
            "is_approved_by_admin",
            "Job_type",
            "category",
            "experience_level",
        ]


class CurrentJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentJob
        fields = "__all__"


class AlumniProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniProfile
        fields = "__all__"


class GraduateInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GraduateInformation
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class CurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculum
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class EmploymentRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmploymentRecord
        fields = "__all__"


class MonthlySalaryDistributionSerializer(serializers.Serializer):
    x = serializers.CharField()
    y = serializers.ListField(child=serializers.IntegerField())


class AlumniGraduationYearDistributionAnalysisSerializer(serializers.Serializer):
    year_graduated = serializers.IntegerField()
    alumni_count = serializers.IntegerField()


class EmploymentDataSerializer(serializers.Serializer):
    name = serializers.CharField(allow_blank=True, required=False)
    dateEmployed = serializers.DateField(
        allow_null=True, required=False, format="%Y-%m-%d"
    )
    employmentStatus = serializers.CharField(allow_blank=True, required=False)
    monthlySalary = serializers.DecimalField(
        allow_null=True, required=False, max_digits=10, decimal_places=2
    )


class AlumniFormSerializer(serializers.Serializer):
    fname = serializers.CharField()
    lname = serializers.CharField()
    mi = serializers.CharField(allow_blank=True, required=False)
    sex = serializers.CharField()
    religion = serializers.CharField()
    civil_status = serializers.CharField()
    date_of_birth = serializers.DateField(format="%Y-%m-%d")
    facebook_account = serializers.CharField()
    contact_number = serializers.CharField()
    alumni_address = serializers.CharField()
    year_graduated = serializers.CharField()
    course = serializers.CharField()
    job_position = serializers.CharField(allow_blank=True, required=False)
    salary = serializers.DecimalField(
        allow_null=True, required=False, max_digits=10, decimal_places=2
    )
    current_job_address = serializers.CharField(allow_blank=True, required=False)
    company_affiliation = serializers.CharField(allow_blank=True, required=False)
    employed_within_6mo = serializers.BooleanField()
    promoted_in_current_job = serializers.BooleanField()
    getting_jobs_related_to_experience = serializers.BooleanField()
    description = serializers.CharField(allow_blank=True, required=False)
    employmentData = EmploymentDataSerializer(
        many=True, allow_empty=True, required=False
    )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if not data["employmentData"]:
            del data["employmentData"]
        return data


class EmployedWithinSixMonthsAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentJob
        fields = "__all__"


class TableAlumniInformationSerializer(serializers.ModelSerializer):
    alumni_id = serializers.CharField(source="alumni.alumni_id")
    course = serializers.CharField(source="alumni.course.course_name")
    alumni_fname = serializers.CharField(source="alumni.fname")
    alumni_lname = serializers.CharField(source="alumni.lname")
    employment_status = serializers.SerializerMethodField()
    has_current_job = serializers.SerializerMethodField()
    year_graduated = serializers.SerializerMethodField()

    class Meta:
        model = GraduateInformation
        fields = [
            "alumni_id",
            "alumni_fname",
            "alumni_lname",
            "year_graduated",
            "course",
            "has_current_job",
            "employment_status",
        ]

    def get_year_graduated(self, obj):
        return obj.year_graduated

    def get_has_current_job(self, obj):
        alumni_profile = obj.alumni
        return alumni_profile.current_job.exists()

    def get_employment_status(self, obj):
        alumni_profile = obj.alumni
        current_job = alumni_profile.current_job.first()
        return current_job.employment_status if current_job else None


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        user_profile = (
            user_job
        ) = user_education = accounts = user_work_experience = user_skills = None

        try:
            user_profile = UserProfile.objects.get(user=user)

            user_job = UserJob.objects.get(user=user)

            user_education = UserEducation.objects.get(user=user)

            accounts = AccountLink.objects.filter(user=user)

            user_skills = UserSkill.objects.filter(user_profile=user_profile)

            user_work_experience = UserWorkExperience.objects.filter(user=user)
        except UserProfile.DoesNotExist:
            user_profile = None
        except UserJob.DoesNotExist:
            user_job = None
        except UserEducation.DoesNotExist:
            user_education = None
        except AccountLink.DoesNotExist:
            accounts = None
        except UserWorkExperience.DoesNotExist:
            user_work_experience = None
        except UserSkill.DoesNotExist:
            user_skills = None

        user_profile_serialized = UserProfileSerializer(user_profile)
        user_job_serialized = UserJobSerializer(user_job)
        user_education_serialized = UserEducationSerializer(user_education)
        accounts_serialized = AccountLinkSerializer(accounts, many=True)
        user_work_experience_serializer = UserWorkExperienceSerializer(
            user_work_experience, many=True
        )

        if user_skills:
            skill_ids = [skill.category_id for skill in user_skills]
            skill_names = JobCategory.objects.filter(id__in=skill_ids).values_list(
                "name", flat=True
            )
            user_skills_serialized = {"skills": list(skill_names)}

        token = super().get_token(user)
        token["username"] = user.username
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["email"] = user.email
        token["is_staff"] = user.is_staff
        token["is_staff"] = user.is_superuser
        token["profile_info"] = user_profile_serialized.data

        languages = user_profile.languages.all()
        language_names = [language.name for language in languages]

        token["profile_info"]["languages"] = language_names
        token["profile_info"]["skills"] = language_names

        token["user_job"] = user_job_serialized.data
        token["user_work_experience"] = user_work_experience_serializer.data
        token["user_education"] = user_education_serialized.data
        token["account_links"] = accounts_serialized.data
        token["profile_info"]["skills"] = (
            user_skills_serialized if user_skills else None
        )

        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
