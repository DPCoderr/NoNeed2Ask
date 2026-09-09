using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoNeed2Ask.Api.Database.Migrations
{
    /// <inheritdoc />
    public partial class UsePublicPageIds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_public_profile_settings_PublicSlug",
                table: "public_profile_settings");

            migrationBuilder.RenameColumn(
                name: "PublicSlug",
                table: "public_profile_settings",
                newName: "PublicPageId");

            // Replace every existing name-based link with an independent random UUID.
            migrationBuilder.Sql(
                """
                ALTER TABLE public_profile_settings
                ALTER COLUMN "PublicPageId" TYPE uuid USING gen_random_uuid();
                """);

            migrationBuilder.CreateIndex(
                name: "IX_public_profile_settings_PublicPageId",
                table: "public_profile_settings",
                column: "PublicPageId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_public_profile_settings_PublicPageId",
                table: "public_profile_settings");

            // Keep unique, opaque links on rollback; old name-based links are not restored.
            migrationBuilder.Sql(
                """
                ALTER TABLE public_profile_settings
                ALTER COLUMN "PublicPageId" TYPE character varying(100) USING "PublicPageId"::text;
                """);

            migrationBuilder.RenameColumn(
                name: "PublicPageId",
                table: "public_profile_settings",
                newName: "PublicSlug");

            migrationBuilder.CreateIndex(
                name: "IX_public_profile_settings_PublicSlug",
                table: "public_profile_settings",
                column: "PublicSlug",
                unique: true);
        }
    }
}
