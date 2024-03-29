from django.urls import path
from .analysis import (
    EmployedWithinSixMonthsAnalysis,
    AlumniGraduationYearDistributionAnalysis,
    MonthlySalaryDistributionAnalysis,
    GenderBasedCurrentJobAnalyis,
    TopPerformingCourseAnalysis,
    GraduatesByCourseAnalysis,
    EmploymentTypeAnalysis,
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
    UpdateAccountInformationView,
    LanguageView,
    UpdateProfileForm,
    JobApplicationForUser,
    JobApplicationView,
    SavedJobForUser,
    SavedJobView,
    CurriculumView,
    CurriculumYearList,
    CurriculumWithCoursesList,
    NewsListView,
    NewsDetailsView,
    EventView,
    EventParticipateView,
    SystemUpdateView,
)


urlpatterns = [
    # System Updates
    path(
        "system-updates-list/", SystemUpdateView.as_view(), name="system-updates-list"
    ),
    # Event
    path("event-list/", EventView.as_view(), name="event-list"),
    path(
        "event-participate/", EventParticipateView.as_view(), name="event-participate"
    ),
    # News
    path("news-list/", NewsListView.as_view(), name="news-list"),
    path("news-details/", NewsDetailsView.as_view(), name="news-details"),
    # admin
    path("curriculum-list/", CurriculumList.as_view(), name="curriculum-list"),
    path(
        "curriculum-with-courses-list/",
        CurriculumWithCoursesList.as_view(),
        name="curriculum-with-courses-list",
    ),
    path(
        "curriculum-year-list/",
        CurriculumYearList.as_view(),
        name="curriculum-year-list",
    ),
    path("course-list/", CourseList.as_view(), name="course-list"),
    path("curriculum/", CurriculumCourseView.as_view(), name="curriculum-courses"),
    path("table-alumni/", TableAlumniView.as_view(), name="table-alumni"),
    path("alumni-form/", AlumniForm.as_view(), name="alumni-form"),
    path("get-profile/", GetProfileView.as_view(), name="get-profile"),
    path("curriculum-handler/", CurriculumView.as_view(), name="curriculum-handler"),
    # user
    path("job-type-list/", JobTypeList.as_view(), name="job-type-list"),
    path("job-category-list/", JobCategoryList.as_view(), name="job-category-list"),
    path("job-list/", JobListView.as_view(), name="job-list"),
    path("job-details/", GetJobDetails.as_view(), name="job-details"),
    path("language-list/", LanguageView.as_view(), name="language-list"),
    path(
        "job-recommendation/",
        JobRecommendationForUser.as_view(),
        name="job-recommendation",
    ),
    path(
        "update-account-information/<int:user_id>/",
        UpdateAccountInformationView.as_view(),
        name="update-account-information",
    ),
    path(
        "update-profile-information/<int:user_id>/",
        UpdateProfileForm.as_view(),
        name="update-profile-information",
    ),
    # Job Application
    path("job-application/", JobApplicationView.as_view(), name="job-application"),
    path(
        "user-job-application/",
        JobApplicationForUser.as_view(),
        name="user-job-application",
    ),
    # Saved Job
    path("saved-job/", SavedJobView.as_view(), name="saved-job"),
    path(
        "user-saved-job/",
        SavedJobForUser.as_view(),
        name="user-saved-job",
    ),
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
        "employment-type/",
        EmploymentTypeAnalysis.as_view(),
        name="employment-type",
    ),
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
