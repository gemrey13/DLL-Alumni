from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework import status
from django.db import transaction
from django.contrib.auth.models import User
from datetime import datetime
from django.db.models import Count, Q


from .serializers import (
    TableAlumniInformationSerializer,
    AlumniFormSerializer,
    AlumniProfileSerializer,
    CurrentJobSerializer,
    CurriculumSerializer,
    CourseSerializer,
    EmploymentRecordSerializer,
    UserSerializer,
    JobListSerializer,
    JobItemDetailsSerializer,
    JobCategorySerializer,
    UserDetailSerializer
)
from .models import (
    GraduateInformation,
    AlumniProfile,
    Curriculum,
    Course,
    Address,
    CurrentJob,
    EmploymentRecord,
    Job,
    JobCategory
)


class JobCategoryList(ListAPIView):
    serializer_class = JobCategorySerializer

    def list(self, request, *args, **kwargs):
        categories = JobCategory.objects.values_list("name", flat=True).distinct()
        return Response(categories)

class JobTypeList(ListAPIView):
    serializer_class = JobListSerializer

    def list(self, request, *args, **kwargs):
        job_type = Job.objects.values_list("Job_type", flat=True).distinct()
        return Response(job_type)


class JobListPagination(PageNumberPagination):
    page_size = 10
    ordering = '-created_at'

class JobListView(ListAPIView):
    serializer_class = JobListSerializer
    pagination_class = JobListPagination

    def get_queryset(self):
        queryset = Job.objects.filter(is_approved_by_admin=True).order_by('-created_at')
        
        title = self.request.query_params.get("title", None)
        category = self.request.query_params.get("category", None)
        category_mobile = self.request.query_params.get("category_mobile", None)
        experience_levels = self.request.query_params.get("experience_level", "")

        job_type = self.request.query_params.get("Job_type", None)
        job_type_mobile = self.request.query_params.get("Job_type_mobile", None)
        
        order_by = self.request.query_params.get("order_by", "newest")

        if title:
            queryset = queryset.filter(title__icontains=title)

        if category:
            queryset = queryset.filter(category__name=category)

        if category_mobile:
            queryset = queryset.filter(category__name=category_mobile)

        if job_type:
            queryset = queryset.filter(Job_type=job_type)

        if job_type_mobile:
            queryset = queryset.filter(Job_type=job_type_mobile)

        # Use Q objects to handle multiple selected experience levels
        experience_filter = Q()
        if experience_levels:
            for level in experience_levels.split(','):
                experience_filter |= Q(experience_level=level)

        if experience_filter:
            queryset = queryset.filter(experience_filter)

        queryset = queryset.annotate(num_applicants=Count('applications'))

        if order_by == "newest":
            queryset = queryset.order_by('-created_at')
        elif order_by == "oldest":
            queryset = queryset.order_by('created_at')
        elif order_by == "relevance":
            queryset = queryset.order_by('-num_applicants')

        return queryset
    

class CurriculumList(ListAPIView):
    """
    `CurriculumList` uses `ListAPIView` to retrieve and serialize all `Curriculum` instances.
    """

    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer


class CourseList(ListAPIView):
    """
    `CourseList` returns a distinct list of course names using `values_list` in the `list` method.
    """

    serializer_class = CourseSerializer

    def list(self, request, *args, **kwargs):
        course_names = Course.objects.values_list("course_name", flat=True).distinct()
        return Response(course_names)


class CurriculumCourseView(ListAPIView):
    """
    `CurriculumCourseView` uses `ListAPIView` that fetches and
    serializes a list of courses. It supports an optional query parameter `year_graduated`.
    If provided, it filters courses associated with the curriculum for the specified graduation year.
    The response includes course details such as ID, name, description, units, and curriculum.
    """

    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = Course.objects.all()
        year_graduated = self.request.query_params.get("year_graduated", None)
        if year_graduated:
            try:
                curriculum = Curriculum.objects.get(
                    start_year__lte=year_graduated, end_year__gte=year_graduated
                )
                queryset = queryset.filter(curriculum=curriculum)
            except Curriculum.DoesNotExist:
                queryset = Course.objects.none()
        return queryset


class AlumniMetricsSummary(ListAPIView):
    serializer_class = CurrentJobSerializer

    def get_queryset(self):
        current_jobs = CurrentJob.objects.all()

        promoted_alumni = current_jobs.filter(promoted_in_current_job=True).count()
        relevant_job = current_jobs.filter(
            getting_jobs_related_to_experience=True
        ).count()
        employed_alumni = current_jobs.count()

        all_alumni_profiles_count = AlumniProfile.objects.exclude(
            alumni_id="A0-111"
        ).count()

        # current_year = datetime.now().year
        current_year = 2023
        prev_year = current_year - 1

        current_graduate_alumni = GraduateInformation.objects.filter(
            year_graduated=current_year
        )
        current_alumni = AlumniProfile.objects.filter(
            graduateinformation__in=current_graduate_alumni
        )
        current_jobs_alumni = CurrentJob.objects.filter(alumni__in=current_alumni)
        current_promoted = current_jobs_alumni.filter(promoted_in_current_job=True)
        current_relevant = current_jobs_alumni.filter(
            getting_jobs_related_to_experience=True
        )

        prev_graduate_alumni = GraduateInformation.objects.filter(year_graduated=prev_year)
        prev_alumni = AlumniProfile.objects.filter(
            graduateinformation__in=prev_graduate_alumni
        )
        prev_jobs_alumni = CurrentJob.objects.filter(alumni__in=prev_alumni)
        prev_promoted = prev_jobs_alumni.filter(promoted_in_current_job=True)
        prev_relevant = prev_jobs_alumni.filter(getting_jobs_related_to_experience=True)

        """this is for previous year jobs and current job percentage"""
        percentage_current_job = self.calculate_percentage_change(
            prev_jobs_alumni.count(), current_jobs_alumni.count()
        )
        # print(f"The percentage change is: {percentage_change:.2f}%")

        """this is for alumni traced previous year and current year"""
        percentage_alumni = self.calculate_percentage_change(
            prev_graduate_alumni.count(), current_graduate_alumni.count()
        )

        """this is for promoted job previous year and current year"""
        percentage_promoted = self.calculate_percentage_change(
            prev_promoted.count(), current_promoted.count()
        )

        """this is for relevant job previous year and current year"""
        percentage_relevant = self.calculate_percentage_change(
            prev_relevant.count(), current_relevant.count()
        )

        data = {
            "percentage_jobs": percentage_current_job,
            "employed_alumni": employed_alumni,
            "percentage_alumni": percentage_alumni,
            "alumni_profiles": all_alumni_profiles_count,
            "percentage_relevant": percentage_relevant,
            "relevant_job": relevant_job,
            "percentage_promoted": percentage_promoted,
            "promoted_alumni": promoted_alumni,
        }
        return data

    def list(self, request, *args, **kwargs):
        data = self.get_queryset()

        return Response(data)

    def calculate_percentage_change(self, old_value, new_value):
        try:
            percentage_change = ((new_value - old_value) / abs(old_value)) * 100
            return percentage_change
        except ZeroDivisionError:
            # Handle the case where the old value is zero
            return float("inf")




class TableAlumniPagination(PageNumberPagination):
    page_size = 10


class TableAlumniView(ListAPIView):
    """
    `TableAlumniView` is a paginated list view of graduate information. It uses
    `TableAlumniInformationSerializer` for serialization and supports optional
    filtering by curriculum number, course name, and number of course units.
    """

    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = TableAlumniInformationSerializer
    pagination_class = TableAlumniPagination

    def get_queryset(self):
        queryset = GraduateInformation.objects.order_by("-alumni_id")

        curriculum_no = self.request.query_params.get("curriculum_no", None)
        course = self.request.query_params.get("course", None)
        no_of_units = self.request.query_params.get("no_of_units", None)

        if curriculum_no:
            queryset = queryset.filter(alumni__course__curriculum__cmo_no=curriculum_no)

        if course:
            queryset = queryset.filter(alumni__course__course_name=course)

        if no_of_units:
            queryset = queryset.filter(alumni__course__no_units=no_of_units)

        return queryset



class GetJobDetails(APIView):
    def get(self, request, *args, **kwargs):
        job_id = self.request.query_params.get("job_id", None)

        if not job_id:
            return Response(
                {"error": "Missing job_id parameter"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        job_detail = Job.objects.filter(id=job_id)
        if not job_detail.exists():
            return Response(
                {"error": "Job detail not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        
        job_instance = job_detail.first()

        posted_by_user = job_instance.posted_by
        user_serializer = UserDetailSerializer(posted_by_user)

        job_serialize = JobItemDetailsSerializer(job_instance)

        data = {
            **job_serialize.data,
            "posted_by": user_serializer.data

        }

        return Response(data, status=status.HTTP_200_OK)



class GetProfileView(APIView):
    """
    `GetProfileView` retrieves detailed alumni information profile including current jobs and employment records
    based on the provided 'alumni_id'. It handles missing parameters and non-existent profiles with
    appropriate error responses.
    """

    def get(self, request, *args, **kwargs):
        alumni_id = self.request.query_params.get("alumni_id", None)
        if not alumni_id:
            return Response(
                {"error": "Missing alumni_id parameter"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        alumni = AlumniProfile.objects.filter(alumni_id=alumni_id)
        if not alumni.exists():
            return Response(
                {"error": "Alumni profile not found"}, status=status.HTTP_404_NOT_FOUND
            )

        alumni_instance = alumni.first()

        current_jobs = CurrentJob.objects.filter(alumni=alumni_instance)
        current_jobs_serializer = CurrentJobSerializer(current_jobs, many=True)

        employment_record = EmploymentRecord.objects.filter(alumni=alumni_instance)
        employment_record_serializer = EmploymentRecordSerializer(
            employment_record, many=True
        )

        data = {
            **AlumniProfileSerializer(alumni_instance).data,
            "current_jobs": current_jobs_serializer.data,
            "employment_record": employment_record_serializer.data,
        }
        return Response(data, status=status.HTTP_200_OK)



class AlumniForm(APIView):
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        serializer = AlumniFormSerializer(data=request.data)

        if serializer.is_valid():
            data = request.data
            alumni_address = data["alumni_address"].split(", ")
            job_address = data["current_job_address"].split(", ")
            alumni_id = self.generate_alumni_id()

            course = Course.objects.get(course_id=data["course"])
            employment_data = data["employmentData"]

            home_address = Address.objects.create(
                country=alumni_address[0],
                region=alumni_address[1],
                province=alumni_address[2],
                city=alumni_address[3],
                barangay=alumni_address[4],
                zip_code=alumni_address[5],
                address_type="Alumni Profile",
            )

            current_job_address = Address.objects.create(
                country=job_address[0],
                region=job_address[1],
                province=job_address[2],
                city=job_address[3],
                barangay=job_address[4],
                zip_code=job_address[5],
                address_type="Current Job",
            )

            alumni = AlumniProfile.objects.create(
                alumni_id=alumni_id,
                course=course,
                fname=data["fname"],
                lname=data["lname"],
                mi=data["mi"],
                sex=data["sex"],
                contact_number=data["contact_number"],
                religion=data["religion"],
                civil_status=data["civil_status"],
                date_of_birth=data["date_of_birth"],
                facebook_account_name=data["contact_number"],
                home_address=home_address,
            )

            CurrentJob.objects.create(
                alumni=alumni,
                job_position=data["job_position"],
                approximate_monthly_salary=data["salary"],
                company_affiliation=data["company_affiliation"],
                company_address=current_job_address,
                employment_status=data["current_job_employment_status"],
                employed_within_6mo=data["employed_within_6mo"],
                promoted_in_current_job=data["promoted_in_current_job"],
                getting_jobs_related_to_experience=data[
                    "getting_jobs_related_to_experience"
                ],
            )

            for employment in employment_data:
                if (
                    employment["name"] != ""
                    and employment["dateEmployed"] is not None
                    and employment["employmentStatus"] != ""
                    and employment["monthlySalary"] != ""
                ):
                    EmploymentRecord.objects.create(
                        alumni=alumni,
                        company_name=employment["name"],
                        employment_status=employment["employmentStatus"],
                        approximate_monthly_salary=employment["monthlySalary"],
                        date_employed=employment["dateEmployed"],
                    )

            GraduateInformation.objects.create(
                alumni=alumni,
                year_graduated=data["year_graduated"],
                satisfaction_level=data["satisfaction_rate"],
                pursued_further_education=data["pursued_further_education"],
                honor=data["description"],
            )

            return Response(
                {"message": "Form submitted successfully"}, status=status.HTTP_200_OK
            )
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def generate_alumni_id(self):
        with transaction.atomic():
            last_id = AlumniProfile.objects.order_by("-alumni_id").first()

            if last_id:
                last_number = int(last_id.alumni_id.split("-")[1])
            else:
                last_number = 0

            new_number = last_number + 1
            new_alumni_id = f"A0-{new_number:04d}"

            return new_alumni_id


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JWTView(APIView):
    def get(self, request, *args, **kwargs):
        """returns a view containing all the possible routes"""
        routes = ["/api/token", "/api/token/refresh"]
        return Response(routes)