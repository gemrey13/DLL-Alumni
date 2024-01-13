from django.urls import path
from .analysis import (
    EmployedWithinSixMonthsAnalysis,
    AlumniGraduationYearDistributionAnalysis,
    MonthlySalaryDistributionAnalysis,
    GenderBasedCurrentJobAnalyis,
    TopPerformingCourseAnalysis,
    GraduatesByCourseAnalysis,
    TestAnalysisView,
    AnalysisTest2View,
)
from .views import (
    TableAlumniView,
    CurriculumList,
    CourseList,
    CurriculumCourseView,
    AlumniForm,
    GetProfileView,
    AlumniMetricsSummary,
    UserRegistrationView,
    JobListView,
    JobTypeList,
    JobCategoryList,
    GetJobDetails,
    JobRecommendationForUser,
)


urlpatterns = [
    # admin
    path("curriculum-list/", CurriculumList.as_view(), name="curriculum-list"),
    path("course-list/", CourseList.as_view(), name="course-list"),
    path("curriculum/", CurriculumCourseView.as_view(), name="curriculum-courses"),
    path("table-alumni/", TableAlumniView.as_view(), name="table-alumni"),
    path("alumni-form/", AlumniForm.as_view(), name="alumni-form"),
    path("get-profile/", GetProfileView.as_view(), name="get-profile"),
    # user
    path("job-type-list/", JobTypeList.as_view(), name="job-type-list"),
    path("job-category-list/", JobCategoryList.as_view(), name="job-category-list"),
    path("job-list/", JobListView.as_view(), name="job-list"),
    path("job-details/", GetJobDetails.as_view(), name="job-details"),
    path("job-recommendation/", JobRecommendationForUser.as_view(), name="job-recommendation"),
    # Registration
    path("signup/", UserRegistrationView.as_view(), name="sign-up"),
    # Metrics
    path(
        "alumni-metrics-summary/",
        AlumniMetricsSummary.as_view(),
        name="alumni-metrics-summary",
    ),
    # Analysis
    path(
        "employed-within-six-months/",
        EmployedWithinSixMonthsAnalysis.as_view(),
        name="employed-within-six-months",
    ),
    path(
        "graduation-year-dist/",
        AlumniGraduationYearDistributionAnalysis.as_view(),
        name="graduation-year-dist",
    ),
    path(
        "monthly-salary-dist/",
        MonthlySalaryDistributionAnalysis.as_view(),
        name="monthly-salary-dist",
    ),
    path(
        "gender-current-job/",
        GenderBasedCurrentJobAnalyis.as_view(),
        name="gender-current-job",
    ),
    path(
        "top-performing-course/",
        TopPerformingCourseAnalysis.as_view(),
        name="top-performing-course",
    ),
    path(
        "graduates-by-course/",
        GraduatesByCourseAnalysis.as_view(),
        name="graduates-by-course",
    ),
    path("analysis/", TestAnalysisView.as_view(), name="analysis"),
    path("analysis2/", AnalysisTest2View.as_view(), name="analysis2"),
]
