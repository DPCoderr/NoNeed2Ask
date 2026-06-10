using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoNeed2Ask.Api.Database.Migrations
{
    /// <inheritdoc />
    public partial class RemoveWaitingAndGhostedStatuses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_applications_status",
                table: "applications");

            migrationBuilder.Sql(
                """
                UPDATE applications
                SET "Status" = 'applied'
                WHERE "Status" IN ('waiting_response', 'ghosted')
                """);

            migrationBuilder.AddCheckConstraint(
                name: "CK_applications_status",
                table: "applications",
                sql: "\"Status\" IN ('applied', 'interview_planned', 'interview_done', 'offer', 'rejected', 'paused')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_applications_status",
                table: "applications");

            migrationBuilder.AddCheckConstraint(
                name: "CK_applications_status",
                table: "applications",
                sql: "\"Status\" IN ('applied', 'waiting_response', 'interview_planned', 'interview_done', 'offer', 'rejected', 'ghosted', 'paused')");
        }
    }
}
