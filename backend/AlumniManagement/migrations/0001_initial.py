# Generated by Django 4.2.2 on 2023-06-30 03:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="AlumniProfile",
            fields=[
                (
                    "alumni_id",
                    models.CharField(max_length=6, primary_key=True, serialize=False),
                ),
                ("fname", models.CharField(max_length=64)),
                ("lname", models.CharField(max_length=64)),
                ("mi", models.CharField(blank=True, max_length=2)),
                ("suffix", models.CharField(blank=True, max_length=3)),
                (
                    "sex",
                    models.CharField(
                        choices=[("male", "Male"), ("female", "Female")], max_length=10
                    ),
                ),
                ("religion", models.CharField(max_length=64)),
                ("marital_status", models.CharField(max_length=64)),
                ("date_of_birth", models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name="Barangay",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("barangay_name", models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name="City",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("city_name", models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name="Country",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("country_name", models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name="Course",
            fields=[
                (
                    "course_id",
                    models.CharField(max_length=6, primary_key=True, serialize=False),
                ),
                ("course_name", models.CharField(max_length=64)),
                ("course_desc", models.CharField(blank=True, max_length=255)),
                (
                    "field_type",
                    models.CharField(
                        choices=[
                            ("technology", "Technology"),
                            ("medical", "Medical/Healthcare"),
                            ("mechanical", "Mechanical Engineering"),
                            ("electrical", "Electrical Engineering"),
                            ("finance", "Finance/Accounting"),
                            ("education", "Education/Teaching"),
                            ("marketing", "Marketing/Advertising"),
                            ("sales", "Sales"),
                            ("business", "Business Development"),
                            ("hr", "Human Resources"),
                            ("law", "Law/Legal"),
                            ("consulting", "Consulting"),
                            ("manufacturing", "Manufacturing"),
                            ("hospitality", "Hospitality/Travel"),
                            ("retail", "Retail"),
                            ("media", "Media/Entertainment"),
                            ("art", "Art/Design"),
                            ("architecture", "Architecture"),
                            ("nonprofit", "Nonprofit/Volunteering"),
                            ("government", "Government/Public Administration"),
                        ],
                        default="technology",
                        max_length=64,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Curriculum",
            fields=[
                (
                    "curriculum_id",
                    models.CharField(max_length=6, primary_key=True, serialize=False),
                ),
                ("curriculum_name", models.CharField(max_length=255)),
                ("description", models.CharField(blank=True, max_length=255)),
                ("year", models.CharField(max_length=4)),
            ],
        ),
        migrations.CreateModel(
            name="Graduate",
            fields=[
                (
                    "graduate_id",
                    models.CharField(max_length=6, primary_key=True, serialize=False),
                ),
                ("graduation_date", models.DateField()),
                ("honor", models.CharField(blank=True, max_length=64)),
                (
                    "alumni",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.alumniprofile",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Segment",
            fields=[
                ("segment_id", models.IntegerField(primary_key=True, serialize=False)),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.course",
                    ),
                ),
                (
                    "curriculum",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.curriculum",
                    ),
                ),
                (
                    "graduate",
                    models.ForeignKey(
                        default="G10000",
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.graduate",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Province",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("province_name", models.CharField(max_length=64)),
                (
                    "country",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.country",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="PreviousJob",
            fields=[
                (
                    "previous_job_id",
                    models.CharField(max_length=10, primary_key=True, serialize=False),
                ),
                (
                    "field_type",
                    models.CharField(
                        choices=[
                            ("technology", "Technology"),
                            ("medical", "Medical/Healthcare"),
                            ("mechanical", "Mechanical Engineering"),
                            ("electrical", "Electrical Engineering"),
                            ("finance", "Finance/Accounting"),
                            ("education", "Education/Teaching"),
                            ("marketing", "Marketing/Advertising"),
                            ("sales", "Sales"),
                            ("business", "Business Development"),
                            ("hr", "Human Resources"),
                            ("law", "Law/Legal"),
                            ("consulting", "Consulting"),
                            ("manufacturing", "Manufacturing"),
                            ("hospitality", "Hospitality/Travel"),
                            ("retail", "Retail"),
                            ("media", "Media/Entertainment"),
                            ("art", "Art/Design"),
                            ("architecture", "Architecture"),
                            ("nonprofit", "Nonprofit/Volunteering"),
                            ("government", "Government/Public Administration"),
                        ],
                        default="technology",
                        max_length=64,
                    ),
                ),
                ("job_title", models.CharField(max_length=64)),
                ("salary", models.IntegerField()),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
                ("company_name", models.CharField(max_length=64)),
                (
                    "alumni",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.alumniprofile",
                    ),
                ),
                (
                    "barangay",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.barangay",
                    ),
                ),
                (
                    "city",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.city",
                    ),
                ),
                (
                    "country",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.country",
                    ),
                ),
                (
                    "province",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.province",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CurrentJob",
            fields=[
                (
                    "current_job_id",
                    models.CharField(max_length=6, primary_key=True, serialize=False),
                ),
                (
                    "field_type",
                    models.CharField(
                        choices=[
                            ("technology", "Technology"),
                            ("medical", "Medical/Healthcare"),
                            ("mechanical", "Mechanical Engineering"),
                            ("electrical", "Electrical Engineering"),
                            ("finance", "Finance/Accounting"),
                            ("education", "Education/Teaching"),
                            ("marketing", "Marketing/Advertising"),
                            ("sales", "Sales"),
                            ("business", "Business Development"),
                            ("hr", "Human Resources"),
                            ("law", "Law/Legal"),
                            ("consulting", "Consulting"),
                            ("manufacturing", "Manufacturing"),
                            ("hospitality", "Hospitality/Travel"),
                            ("retail", "Retail"),
                            ("media", "Media/Entertainment"),
                            ("art", "Art/Design"),
                            ("architecture", "Architecture"),
                            ("nonprofit", "Nonprofit/Volunteering"),
                            ("government", "Government/Public Administration"),
                        ],
                        default="technology",
                        max_length=64,
                    ),
                ),
                ("job_title", models.CharField(max_length=64)),
                ("salary", models.IntegerField()),
                ("start_date", models.DateField()),
                ("company_name", models.CharField(max_length=64)),
                (
                    "alumni",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.alumniprofile",
                    ),
                ),
                (
                    "barangay",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.barangay",
                    ),
                ),
                (
                    "city",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.city",
                    ),
                ),
                (
                    "country",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.country",
                    ),
                ),
                (
                    "province",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="AlumniManagement.province",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="city",
            name="province",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="AlumniManagement.province",
            ),
        ),
        migrations.AddField(
            model_name="barangay",
            name="city",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="AlumniManagement.city"
            ),
        ),
        migrations.AddField(
            model_name="alumniprofile",
            name="barangay",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="AlumniManagement.barangay",
            ),
        ),
        migrations.AddField(
            model_name="alumniprofile",
            name="city",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="AlumniManagement.city"
            ),
        ),
        migrations.AddField(
            model_name="alumniprofile",
            name="country",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="AlumniManagement.country",
            ),
        ),
        migrations.AddField(
            model_name="alumniprofile",
            name="course_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="AlumniManagement.course",
            ),
        ),
        migrations.AddField(
            model_name="alumniprofile",
            name="province",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="AlumniManagement.province",
            ),
        ),
        migrations.AddField(
            model_name="alumniprofile",
            name="user",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
