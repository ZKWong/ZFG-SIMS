using Microsoft.EntityFrameworkCore.Migrations;

namespace SIMS.API.Migrations
{
    public partial class updatetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "courses_offer");

            migrationBuilder.DropTable(
                name: "day_hourly");

            migrationBuilder.DropTable(
                name: "kourses");

            migrationBuilder.DropTable(
                name: "Values");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "courses_offer",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    course = table.Column<string>(nullable: true),
                    course_semester = table.Column<string>(nullable: true),
                    course_year = table.Column<string>(nullable: true),
                    prof_id = table.Column<int>(nullable: false)
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
                    course_id_1 = table.Column<int>(nullable: false),
                    course_id_10 = table.Column<int>(nullable: false),
                    course_id_11 = table.Column<int>(nullable: false),
                    course_id_12 = table.Column<int>(nullable: false),
                    course_id_13 = table.Column<int>(nullable: false),
                    course_id_14 = table.Column<int>(nullable: false),
                    course_id_15 = table.Column<int>(nullable: false),
                    course_id_16 = table.Column<int>(nullable: false),
                    course_id_2 = table.Column<int>(nullable: false),
                    course_id_3 = table.Column<int>(nullable: false),
                    course_id_4 = table.Column<int>(nullable: false),
                    course_id_5 = table.Column<int>(nullable: false),
                    course_id_6 = table.Column<int>(nullable: false),
                    course_id_7 = table.Column<int>(nullable: false),
                    course_id_8 = table.Column<int>(nullable: false),
                    course_id_9 = table.Column<int>(nullable: false),
                    course_semester = table.Column<string>(nullable: true),
                    course_year = table.Column<string>(nullable: true),
                    hday = table.Column<int>(nullable: false),
                    htime = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_day_hourly", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "kourses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    appr = table.Column<string>(nullable: true),
                    course = table.Column<string>(nullable: true),
                    course_name = table.Column<string>(nullable: true),
                    credit = table.Column<string>(nullable: true),
                    crn = table.Column<string>(nullable: true),
                    long_title = table.Column<string>(nullable: true),
                    max_students = table.Column<int>(nullable: false),
                    sect = table.Column<string>(nullable: true),
                    subj = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kourses", x => x.Id);
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
        }
    }
}
