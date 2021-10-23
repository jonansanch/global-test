using DomainLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PersistenceLayer
{
    public class FacturaConfig
    {
        public FacturaConfig(EntityTypeBuilder<Factura> entityBuilder)
        {
            entityBuilder.Property(x => x.Fecha).IsRequired().HasDefaultValueSql("GETDATE()");
            entityBuilder.Property(x => x.TipodePago).IsRequired().HasMaxLength(30);
            entityBuilder.Property(x => x.DocumentoCliente).IsRequired().HasMaxLength(30);
            entityBuilder.Property(x => x.NombreCliente).IsRequired().HasMaxLength(30);
            entityBuilder.Property(x => x.Descuento).IsRequired().HasDefaultValueSql("0");
            entityBuilder.Property(x => x.IVA).IsRequired().HasDefaultValueSql("19");
            entityBuilder.Property(x => x.TotalDescuento).IsRequired().HasDefaultValueSql("0");
            entityBuilder.Property(x => x.Total).IsRequired().HasDefaultValueSql("0");
        }
    }
}