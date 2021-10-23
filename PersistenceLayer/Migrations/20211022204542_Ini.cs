using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PersistenceLayer.Migrations
{
    public partial class Ini : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Factura",
                columns: table => new
                {
                    FacturaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumeroFactura = table.Column<int>(type: "int", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    TipodePago = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    DocumentoCliente = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    NombreCliente = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Subtotal = table.Column<long>(type: "bigint", nullable: false),
                    Descuento = table.Column<int>(type: "int", nullable: false, defaultValueSql: "0"),
                    IVA = table.Column<int>(type: "int", nullable: false, defaultValueSql: "19"),
                    TotalDescuento = table.Column<int>(type: "int", nullable: false, defaultValueSql: "0"),
                    TotalImpuesto = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<int>(type: "int", nullable: false, defaultValueSql: "0")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Factura", x => x.FacturaId);
                });

            migrationBuilder.CreateTable(
                name: "Producto",
                columns: table => new
                {
                    ProductoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomProducto = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TariDescuento = table.Column<int>(type: "int", nullable: false, defaultValueSql: "0")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Producto", x => x.ProductoId);
                });

            migrationBuilder.CreateTable(
                name: "FacturaDetalle",
                columns: table => new
                {
                    FacturaDetalleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FacturaId = table.Column<int>(type: "int", nullable: false),
                    ProductoId = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false, defaultValueSql: "0"),
                    PrecioUnitario = table.Column<int>(type: "int", nullable: false, defaultValueSql: "0")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FacturaDetalle", x => x.FacturaDetalleId);
                    table.ForeignKey(
                        name: "FK_FacturaDetalle_Factura_FacturaId",
                        column: x => x.FacturaId,
                        principalTable: "Factura",
                        principalColumn: "FacturaId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FacturaDetalle_Producto_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "Producto",
                        principalColumn: "ProductoId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FacturaDetalle_FacturaId",
                table: "FacturaDetalle",
                column: "FacturaId");

            migrationBuilder.CreateIndex(
                name: "IX_FacturaDetalle_ProductoId",
                table: "FacturaDetalle",
                column: "ProductoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FacturaDetalle");

            migrationBuilder.DropTable(
                name: "Factura");

            migrationBuilder.DropTable(
                name: "Producto");
        }
    }
}
