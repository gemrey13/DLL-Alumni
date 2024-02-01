from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db.models import Count, Avg

import numpy as np

from .models import (
    GraduateInformation,
    AlumniProfile,
    Course,
    CurrentJob,
)

from .serializers import (
    AlumniProfileSerializer,
    CurrentJobSerializer,
    AlumniGraduationYearDistributionAnalysisSerializer,
    MonthlySalaryDistributionSerializer,
    EmployedWithinSixMonthsAnalysisSerializer,
    GraduateInformationSerializer,
)


class EmploymentTypeAnalysis(ListAPIView):
    serializer_class = CurrentJobSerializer

    def get_queryset(self):
        employment_type_counts = CurrentJob.objects.values("employment_type").annotate(
            count=Count("id")
        )
        data = {
            entry["employment_type"]: entry["count"] for entry in employment_type_counts
        }
        return data

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response(queryset)


class GraduatesByCourseAnalysis(ListAPIView):
    serializer_class = GraduateInformationSerializer

    def get_queryset(self):
        courses = Course.objects.values_list("course_name", flat=True).distinct()

        data = []
        for course in courses:
            # Yearly Growth
            yearly_growth = (
                GraduateInformation.objects.filter(alumni__course__course_name=course)
                .values("year_graduated")
                .annotate(count=Count("year_graduated"))
                .order_by("year_graduated")
            )

            temp_year = []
            temp_graduates = []

            for year in yearly_growth:
                temp_year.append(year["year_graduated"])
                temp_graduates.append(year["count"])

            temp_data = {
                "course": course,
                "year": temp_year,
                "graduates": temp_graduates,
            }
            data.append(temp_data)
        return data

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response(queryset)


class TopPerformingCourseAnalysis(ListAPIView):
    serializer_class = GraduateInformationSerializer

    def get_queryset(self):
        # Fetch all courses along with their related data
        courses = Course.objects.values_list("course_name", flat=True).distinct()
        current_year = 2023
        prev_year = current_year - 1
        data = []
        for course in courses:
            # Current Year
            satisfaction_rate_current_year = GraduateInformation.objects.filter(
                alumni__course__course_name=course, year_graduated=current_year
            ).aggregate(Avg("satisfaction_level"))
            satisfaction_rate_current_year = (
                satisfaction_rate_current_year["satisfaction_level__avg"]
                if satisfaction_rate_current_year["satisfaction_level__avg"]
                else 0
            )
            honor_rate_current_year = (
                GraduateInformation.objects.filter(
                    alumni__course__course_name=course,
                    honor__isnull=False,
                    year_graduated=current_year,
                ).count()
                / GraduateInformation.objects.filter(
                    alumni__course__course_name=course, year_graduated=current_year
                ).count()
                * 100
            )
            professional_growth_rate_current_year = (
                GraduateInformation.objects.filter(
                    alumni__course__course_name=course,
                    pursued_further_education=True,
                    year_graduated=current_year,
                ).count()
                / GraduateInformation.objects.filter(
                    alumni__course__course_name=course, year_graduated=current_year
                ).count()
                * 100
            )

            # PREVIOUS YEAR
            satisfaction_rate_prev_year = GraduateInformation.objects.filter(
                alumni__course__course_name=course, year_graduated=prev_year
            ).aggregate(Avg("satisfaction_level"))
            satisfaction_rate_prev_year = (
                satisfaction_rate_prev_year["satisfaction_level__avg"]
                if satisfaction_rate_prev_year["satisfaction_level__avg"]
                else 0
            )
            honor_rate_prev_year = (
                GraduateInformation.objects.filter(
                    alumni__course__course_name=course,
                    honor__isnull=False,
                    year_graduated=prev_year,
                ).count()
                / GraduateInformation.objects.filter(
                    alumni__course__course_name=course, year_graduated=prev_year
                ).count()
                * 100
            )
            professional_growth_rate_prev_year = (
                GraduateInformation.objects.filter(
                    alumni__course__course_name=course,
                    pursued_further_education=True,
                    year_graduated=prev_year,
                ).count()
                / GraduateInformation.objects.filter(
                    alumni__course__course_name=course, year_graduated=prev_year
                ).count()
                * 100
            )

            yearly_growth_current_year = (
                professional_growth_rate_current_year
                + honor_rate_current_year
                + satisfaction_rate_current_year
            ) / 3
            yearly_growth_prev_year = (
                professional_growth_rate_prev_year
                + honor_rate_prev_year
                + satisfaction_rate_prev_year
            ) / 3

            growth_rate_difference = self.calculate_percentage_change(
                yearly_growth_prev_year, yearly_growth_current_year
            )

            temp_data = {
                "course": course,
                "growth_rate_difference": round(growth_rate_difference, 2),
                "data": [
                    {
                        "satisfaction_rate_current_year": round(
                            satisfaction_rate_current_year, 2
                        ),
                        "honor_rate_current_year": round(honor_rate_current_year, 2),
                        "professional_growth_rate_current_year": round(
                            professional_growth_rate_current_year, 2
                        ),
                        "yearly_growth_current_year": round(
                            yearly_growth_current_year, 2
                        ),
                    },
                    {
                        "satisfaction_rate_prev_year": round(
                            satisfaction_rate_prev_year, 2
                        ),
                        "honor_rate_prev_year": round(honor_rate_prev_year, 2),
                        "professional_growth_rate_prev_year": round(
                            professional_growth_rate_prev_year, 2
                        ),
                        "yearly_growth_prev_year": round(yearly_growth_prev_year, 2),
                    },
                ],
            }
            data.append(temp_data)
        sorted_data = sorted(
            data, key=lambda x: x["growth_rate_difference"], reverse=True
        )

        return sorted_data

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response(queryset)

    def calculate_percentage_change(self, old_value, new_value):
        try:
            percentage_change = ((new_value - old_value) / abs(old_value)) * 100
            return percentage_change
        except ZeroDivisionError:
            # Handle the case where the old value is zero
            return float("inf")


class EmployedWithinSixMonthsAnalysis(ListAPIView):
    """
    API view for analyzing the employment status of individuals within the last six months.
    Retrieves data from the 'CurrentJob' model and provides counts of individuals employed
    and not employed within the specified time frame.
    """

    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = EmployedWithinSixMonthsAnalysisSerializer

    def get_queryset(self):
        queryset = CurrentJob.objects.all()
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        is_employed_count = queryset.filter(employed_within_6mo=True).count()
        is_not_employed_count = queryset.filter(employed_within_6mo=False).count()

        data = {
            "is_employed_count": is_employed_count,
            "is_not_employed_count": is_not_employed_count,
        }

        return Response(data)


class AlumniGraduationYearDistributionAnalysis(ListAPIView):
    """
    API view for analyzing the distribution of alumni based on their graduation years.
    Retrieves distinct graduation years from the database and counts the number of alumni for each year.
    """

    # permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AlumniGraduationYearDistributionAnalysisSerializer

    def get_queryset(self):
        # Get distinct years of graduation
        distinct_years = GraduateInformation.objects.values_list(
            "year_graduated", flat=True
        ).distinct()

        alumni_counts = []
        for year in distinct_years:
            # Count alumni for each year
            total_alumni_graduated = GraduateInformation.objects.filter(
                year_graduated=year
            ).count()

            alumni_counts.append(
                {"year_graduated": year, "alumni_count": total_alumni_graduated}
            )

        return alumni_counts


class MonthlySalaryDistributionAnalysis(ListAPIView):
    """
    API view for analyzing the distribution of monthly salaries among alumni, categorized by their courses.
    Retrieves distinct courses and calculates summary statistics (min, Q1, median, Q3, max) for monthly salaries
    of alumni in each course, providing insights into salary variations across different academic disciplines.
    """

    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = MonthlySalaryDistributionSerializer

    def get_queryset(self):
        courses = Course.objects.values_list("course_name", flat=True).distinct()

        data = []
        for course_name in courses:
            alumni_salary = CurrentJob.objects.filter(
                alumni__course__course_name=course_name
            ).values_list("approximate_monthly_salary", flat=True)
            salary_array = np.array(alumni_salary)
            min_salary = np.min(salary_array)
            q1_salary = np.percentile(salary_array, 25)
            median_salary = np.median(salary_array)
            q3_salary = np.percentile(salary_array, 75)
            max_salary = np.max(salary_array)
            data.append(
                {
                    "x": course_name,
                    "y": [min_salary, q1_salary, median_salary, q3_salary, max_salary],
                }
            )

        return data

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GenderBasedCurrentJobAnalyis(ListAPIView):
    """
    API view for analyzing the gender distribution among alumni and current job holders.
    Retrieves counts of male and female alumni, as well as male and female alumni in current jobs,
    providing insights into the gender representation in both the overall alumni population and the current workforce.
    """

    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = CurrentJobSerializer

    def get_queryset(self):
        current_jobs = CurrentJob.objects.all()
        alumni_profiles = AlumniProfile.objects.exclude(alumni_id="A0-111")
        current_job_male = current_jobs.filter(alumni__sex="Male")
        current_job_female = current_jobs.filter(alumni__sex="Female")

        alumni_male = alumni_profiles.filter(sex="Male")
        alumni_female = alumni_profiles.filter(sex="Female")

        data = {
            "current_job_male": current_job_male.count(),
            "alumni_male": alumni_male.count(),
            "current_job_female": current_job_female.count(),
            "alumni_female": alumni_female.count(),
            "current_jobs": current_jobs.count(),
        }
        return data

    def list(self, request, *args, **kwargs):
        data = self.get_queryset()
        return Response(data)


class TestAnalysisView(ListAPIView):
    """count the alumni that have current job and none"""

    serializer_class = AlumniProfileSerializer

    def get_queryset(self):
        alumni_with_current_job = AlumniProfile.objects.filter(
            current_job__isnull=False
        )
        alumni_with_no_current_job = AlumniProfile.objects.filter(
            current_job__isnull=True
        )
        return alumni_with_current_job, alumni_with_no_current_job

    def list(self, request, *args, **kwargs):
        alumni_with_current_job, alumni_with_no_current_job = self.get_queryset()
        count_alumni_with_no_current_job = self.get_serializer(
            alumni_with_no_current_job, many=True
        )
        count_alumni_with_current_job = self.get_serializer(
            alumni_with_current_job, many=True
        )
        data = {
            "count_alumni_with_no_current_job": len(
                count_alumni_with_no_current_job.data
            ),
            "count_alumni_with_current_job": len(count_alumni_with_current_job.data),
        }
        return Response(data)


class AnalysisTest2View(ListAPIView):
    """get the current job based on the employment status"""

    serializer_class = CurrentJobSerializer

    def get_queryset(self):
        queryset = []
        employment_status = self.request.query_params.get("employment_status", None)

        # sample = GraduateInformation.objects.filter(honor__isnull=True)
        # sample2 = GraduateInformation.objects.filter(honor__isnull=False)
        # print(sample.count())
        # print(sample2.count())
        ito = GraduateInformation.objects.filter(alumni__course__course_name="BSIT")

        sample1 = ito.filter(satisfaction_level=1).count()
        sample2 = ito.filter(satisfaction_level=2).count()
        sample3 = ito.filter(satisfaction_level=3).count()
        sample4 = ito.filter(satisfaction_level=4).count()
        sample5 = ito.filter(satisfaction_level=5).count()
        none = ito.filter(satisfaction_level=None).count()
        # sample2 = GraduateInformation.objects.filter(pursued_further_education=False)
        # print("Satisfaction 1: ", sample1.count())
        # print("Satisfaction 2: ", sample2.count())
        # print("Satisfaction 3: ", sample3.count())
        # print("Satisfaction 4: ", sample4.count())
        # print("Satisfaction 5: ", sample5.count())
        # print("Satisfaction None: ", none.count())
        # print()
        # print()
        # print()
        satisfaction_counts = [sample1, sample2, sample3, sample4, sample5, none]

        total_responses = sum(satisfaction_counts)

        satisfaction_rates = [
            (count / total_responses) * 100 for count in satisfaction_counts
        ]
        print("BSIT")
        for i, rate in enumerate(satisfaction_rates, start=1):
            print(f"Satisfaction {i}: {rate:.2f}%")

        # print(sample2.count())

        if employment_status:
            queryset = CurrentJob.objects.all()

            try:
                queryset = queryset.filter(employment_status=employment_status)
            except CurrentJob.DoesNotExist:
                queryset = CurrentJob.objects.none()
        return queryset
