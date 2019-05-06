using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SIMS.API.Migrations
{
    public partial class createtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    MiddleName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: false),
                    PhoneNumber2 = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    CurrentAcademicLevel = table.Column<string>(nullable: true),
                    DegreeProgram = table.Column<string>(nullable: true),
                    CurrentProgram = table.Column<string>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    BachelorsStartDate = table.Column<DateTime>(nullable: false),
                    BachelorsMentor = table.Column<string>(nullable: true),
                    BachelorsProjectAdvisor = table.Column<string>(nullable: true),
                    BachelorsThesisAdvisor = table.Column<string>(nullable: true),
                    BachelorsProjectTitle = table.Column<string>(nullable: true),
                    BachelorsThesisTitle = table.Column<string>(nullable: true),
                    BachelorsGradDate = table.Column<DateTime>(nullable: false),
                    MastersStartDate = table.Column<DateTime>(nullable: false),
                    MastersFocus = table.Column<string>(nullable: true),
                    MastersProjectAdvisor = table.Column<string>(nullable: true),
                    MastersThesisAdvisor = table.Column<string>(nullable: true),
                    MastersCommMember1 = table.Column<string>(nullable: true),
                    MastersCommMember2 = table.Column<string>(nullable: true),
                    MastersCommMember3 = table.Column<string>(nullable: true),
                    MastersCommMember4 = table.Column<string>(nullable: true),
                    MastersCommMember5 = table.Column<string>(nullable: true),
                    MastersCommFormedDate = table.Column<DateTime>(nullable: false),
                    MastersDefenseDate = table.Column<DateTime>(nullable: false),
                    MastersProjectTitle = table.Column<string>(nullable: true),
                    MastersThesisTitle = table.Column<string>(nullable: true),
                    MastersGradDate = table.Column<DateTime>(nullable: false),
                    DoctoralCandidate = table.Column<string>(nullable: true),
                    DoctorateStartDate = table.Column<DateTime>(nullable: false),
                    DateAcceptedForCandidacy = table.Column<DateTime>(nullable: false),
                    DoctorateAdvisor = table.Column<string>(nullable: true),
                    ExternalAdvisor = table.Column<string>(nullable: true),
                    DoctorateCommMember1 = table.Column<string>(nullable: true),
                    DoctorateCommMember2 = table.Column<string>(nullable: true),
                    DoctorateCommMember3 = table.Column<string>(nullable: true),
                    DoctorateCommMember4 = table.Column<string>(nullable: true),
                    DoctorateCommMember5 = table.Column<string>(nullable: true),
                    DoctorateCommMember6 = table.Column<string>(nullable: true),
                    DoctorateCommFormDate = table.Column<DateTime>(nullable: false),
                    DissertationDefenseDate = table.Column<DateTime>(nullable: false),
                    DissertationTitle = table.Column<string>(nullable: true),
                    DoctorateGradDate = table.Column<DateTime>(nullable: false),
                    Office = table.Column<string>(nullable: true),
                    ResearchInterest = table.Column<string>(nullable: true),
                    Degree = table.Column<string>(nullable: true),
                    Designation = table.Column<string>(nullable: true),
                    Current = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    uuid = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    courseTitle = table.Column<string>(nullable: true),
                    courseNum = table.Column<string>(nullable: true),
                    section = table.Column<int>(nullable: false),
                    scheduleStartTime = table.Column<string>(nullable: true),
                    scheduleEndTime = table.Column<string>(nullable: true),
                    instructor = table.Column<string>(nullable: true),
                    room = table.Column<string>(nullable: true),
                    creditHours = table.Column<int>(nullable: false),
                    crn = table.Column<string>(nullable: true),
                    MaxStudent = table.Column<int>(nullable: false),
                    notes = table.Column<string>(nullable: true),
                    weekday = table.Column<string>(nullable: true),
                    scheduleType = table.Column<int>(nullable: false),
                    semesterId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.uuid);
                });

            migrationBuilder.CreateTable(
                name: "courses_offer",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    prof_id = table.Column<int>(nullable: false),
                    course = table.Column<string>(nullable: true),
                    course_year = table.Column<string>(nullable: true),
                    course_semester = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_courses_offer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "day_hourly",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    hday = table.Column<int>(nullable: false),
                    htime = table.Column<int>(nullable: false),
                    course_year = table.Column<string>(nullable: true),
                    course_semester = table.Column<string>(nullable: true),
                    course_id_1 = table.Column<int>(nullable: false),
                    course_id_2 = table.Column<int>(nullable: false),
                    course_id_3 = table.Column<int>(nullable: false),
                    course_id_4 = table.Column<int>(nullable: false),
                    course_id_5 = table.Column<int>(nullable: false),
                    course_id_6 = table.Column<int>(nullable: false),
                    course_id_7 = table.Column<int>(nullable: false),
                    course_id_8 = table.Column<int>(nullable: false),
                    course_id_9 = table.Column<int>(nullable: false),
                    course_id_10 = table.Column<int>(nullable: false),
                    course_id_11 = table.Column<int>(nullable: false),
                    course_id_12 = table.Column<int>(nullable: false),
                    course_id_13 = table.Column<int>(nullable: false),
                    course_id_14 = table.Column<int>(nullable: false),
                    course_id_15 = table.Column<int>(nullable: false),
                    course_id_16 = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_day_hourly", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExitSurveys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    surveyDate = table.Column<DateTime>(nullable: false),
                    studentName = table.Column<string>(nullable: true),
                    ssId = table.Column<string>(nullable: true),
                    degreeProgram = table.Column<string>(nullable: true),
                    termGraDuateSemester = table.Column<string>(nullable: true),
                    termGraDuateYear = table.Column<string>(nullable: true),
                    contact1Name = table.Column<string>(nullable: true),
                    contact1PhoneHome = table.Column<string>(nullable: true),
                    contact1PhoneWork = table.Column<string>(nullable: true),
                    contact1PhoneCell = table.Column<string>(nullable: true),
                    contact1Address = table.Column<string>(nullable: true),
                    contact1Email = table.Column<string>(nullable: true),
                    contactOtherOption = table.Column<string>(nullable: true),
                    contact2Name = table.Column<string>(nullable: true),
                    contact2PhoneHome = table.Column<string>(nullable: true),
                    contact2PhoneWork = table.Column<string>(nullable: true),
                    contact2PhoneCell = table.Column<string>(nullable: true),
                    contact2Address = table.Column<string>(nullable: true),
                    contact2Email = table.Column<string>(nullable: true),
                    assessQ1 = table.Column<string>(nullable: true),
                    assessQ2 = table.Column<string>(nullable: true),
                    assessQ3 = table.Column<string>(nullable: true),
                    assessComment = table.Column<string>(nullable: true),
                    furtherStudySchool = table.Column<string>(nullable: true),
                    furtherStudyMajor = table.Column<string>(nullable: true),
                    furtherStudyScholarship = table.Column<string>(nullable: true),
                    jobSearchDuration = table.Column<string>(nullable: true),
                    jobSearchNumInterview = table.Column<string>(nullable: true),
                    jobSearchNumOffer = table.Column<string>(nullable: true),
                    jobSearchAvgSalary = table.Column<string>(nullable: true),
                    jobCompany = table.Column<string>(nullable: true),
                    jobCity = table.Column<string>(nullable: true),
                    jobTitle = table.Column<string>(nullable: true),
                    jobCompanyContact = table.Column<string>(nullable: true),
                    jobCompanyWeb = table.Column<string>(nullable: true),
                    jobSalary = table.Column<string>(nullable: true),
                    networkingQ1 = table.Column<string>(nullable: true),
                    networkingQ2 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExitSurveys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "faculty",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    username = table.Column<string>(nullable: true),
                    first_name = table.Column<string>(nullable: true),
                    last_name = table.Column<string>(nullable: true),
                    title = table.Column<string>(nullable: true),
                    office = table.Column<string>(nullable: true),
                    phone = table.Column<string>(nullable: true),
                    research_interest = table.Column<string>(nullable: true),
                    designation = table.Column<string>(nullable: true),
                    current = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    homepage = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_faculty", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GradSeniorSurveys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    surveyDate = table.Column<DateTime>(nullable: false),
                    degreeProgram = table.Column<string>(nullable: true),
                    termGraduateSemester = table.Column<string>(nullable: true),
                    termGraduateYear = table.Column<string>(nullable: true),
                    Obj1 = table.Column<string>(nullable: true),
                    Obj2 = table.Column<string>(nullable: true),
                    Obj3 = table.Column<string>(nullable: true),
                    Obj4 = table.Column<string>(nullable: true),
                    Obj5 = table.Column<string>(nullable: true),
                    Outcome1 = table.Column<string>(nullable: true),
                    Outcome2 = table.Column<string>(nullable: true),
                    Outcome3 = table.Column<string>(nullable: true),
                    Outcome4 = table.Column<string>(nullable: true),
                    Outcome5 = table.Column<string>(nullable: true),
                    Outcome6 = table.Column<string>(nullable: true),
                    Outcome7 = table.Column<string>(nullable: true),
                    Outcome8 = table.Column<string>(nullable: true),
                    Outcome9 = table.Column<string>(nullable: true),
                    Outcome10 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GradSeniorSurveys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "kourses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    course = table.Column<string>(nullable: true),
                    course_name = table.Column<string>(nullable: true),
                    subj = table.Column<string>(nullable: true),
                    sect = table.Column<string>(nullable: true),
                    crn = table.Column<string>(nullable: true),
                    credit = table.Column<string>(nullable: true),
                    appr = table.Column<string>(nullable: true),
                    long_title = table.Column<string>(nullable: true),
                    max_students = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kourses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Semesters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SemesterTime = table.Column<string>(nullable: true),
                    From = table.Column<string>(nullable: true),
                    To = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Semesters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ThesisProjects",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    studentName = table.Column<string>(nullable: true),
                    docType = table.Column<string>(nullable: true),
                    topic = table.Column<string>(nullable: true),
                    fileName = table.Column<string>(nullable: true),
                    url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThesisProjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Values",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Values", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<int>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BachelorsMentor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    MentorName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BachelorsMentor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BachelorsMentor_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BachelorsProjectAdvisor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    AdvisorName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BachelorsProjectAdvisor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BachelorsProjectAdvisor_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BachelorsThesisAdvisor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    AdvisorName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BachelorsThesisAdvisor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BachelorsThesisAdvisor_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DoctorateAdvisor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    AdvisorName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorateAdvisor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoctorateAdvisor_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DoctorateCommittee",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    FormDate = table.Column<DateTime>(nullable: false),
                    Member1 = table.Column<string>(nullable: true),
                    Member2 = table.Column<string>(nullable: true),
                    Member3 = table.Column<string>(nullable: true),
                    Member4 = table.Column<string>(nullable: true),
                    Member5 = table.Column<string>(nullable: true),
                    Member6 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorateCommittee", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoctorateCommittee_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MastersCommittee",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    FormDate = table.Column<DateTime>(nullable: false),
                    Member1 = table.Column<string>(nullable: true),
                    Member2 = table.Column<string>(nullable: true),
                    Member3 = table.Column<string>(nullable: true),
                    Member4 = table.Column<string>(nullable: true),
                    Member5 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MastersCommittee", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MastersCommittee_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MastersProjectAdvisor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    AdvisorName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MastersProjectAdvisor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MastersProjectAdvisor_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MastersThesisAdvisor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    AdvisorName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MastersThesisAdvisor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MastersThesisAdvisor_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    IsMain = table.Column<bool>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BachelorsMentor_UserId",
                table: "BachelorsMentor",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BachelorsProjectAdvisor_UserId",
                table: "BachelorsProjectAdvisor",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BachelorsThesisAdvisor_UserId",
                table: "BachelorsThesisAdvisor",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorateAdvisor_UserId",
                table: "DoctorateAdvisor",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DoctorateCommittee_UserId",
                table: "DoctorateCommittee",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MastersCommittee_UserId",
                table: "MastersCommittee",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MastersProjectAdvisor_UserId",
                table: "MastersProjectAdvisor",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MastersThesisAdvisor_UserId",
                table: "MastersThesisAdvisor",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_UserId",
                table: "Photos",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "BachelorsMentor");

            migrationBuilder.DropTable(
                name: "BachelorsProjectAdvisor");

            migrationBuilder.DropTable(
                name: "BachelorsThesisAdvisor");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "courses_offer");

            migrationBuilder.DropTable(
                name: "day_hourly");

            migrationBuilder.DropTable(
                name: "DoctorateAdvisor");

            migrationBuilder.DropTable(
                name: "DoctorateCommittee");

            migrationBuilder.DropTable(
                name: "ExitSurveys");

            migrationBuilder.DropTable(
                name: "faculty");

            migrationBuilder.DropTable(
                name: "GradSeniorSurveys");

            migrationBuilder.DropTable(
                name: "kourses");

            migrationBuilder.DropTable(
                name: "MastersCommittee");

            migrationBuilder.DropTable(
                name: "MastersProjectAdvisor");

            migrationBuilder.DropTable(
                name: "MastersThesisAdvisor");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "Semesters");

            migrationBuilder.DropTable(
                name: "ThesisProjects");

            migrationBuilder.DropTable(
                name: "Values");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
