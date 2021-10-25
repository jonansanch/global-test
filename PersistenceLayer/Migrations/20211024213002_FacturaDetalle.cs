using Microsoft.EntityFrameworkCore.Migrations;

namespace PersistenceLayer.Migrations
{
    public partial class FacturaDetalle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Descuento",
                table: "FacturaDetalle",
                type: "int",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "Impuesto",
                table: "FacturaDetalle",
                type: "int",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "TariDesc",
                table: "FacturaDetalle",
                type: "int",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "TariImpto",
                table: "FacturaDetalle",
                type: "int",
                nullable: false,
                defaultValueSql: "19");

            migrationBuilder.AddColumn<int>(
                name: "Total",
                table: "FacturaDetalle",
                type: "int",
                nullable: false,
                defaultValueSql: "0");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descuento",
                table: "FacturaDetalle");

            migrationBuilder.DropColumn(
                name: "Impuesto",
                table: "FacturaDetalle");

            migrationBuilder.DropColumn(
                name: "TariDesc",
                table: "FacturaDetalle");

            migrationBuilder.DropColumn(
                name: "TariImpto",
                table: "FacturaDetalle");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "FacturaDetalle");
        }
    }
}
