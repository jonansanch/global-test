using DomainLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PersistenceLayer
{
    public class FacturaDetalleConfig
    {
        public FacturaDetalleConfig(EntityTypeBuilder<FacturaDetalle> entityBuilder)
        {
            entityBuilder.Property(x => x.Cantidad).IsRequired().HasDefaultValueSql("0");
            entityBuilder.Property(x => x.Nombreproducto).IsRequired(false).HasMaxLength(100);
            entityBuilder.Property(x => x.PrecioUnitario).IsRequired().HasDefaultValueSql("0");
            entityBuilder.Property(x => x.Descuento).IsRequired().HasDefaultValueSql("0");
            entityBuilder.Property(x => x.TariDesc).IsRequired().HasDefaultValueSql("0");
            entityBuilder.Property(x => x.Impuesto).IsRequired().HasDefaultValueSql("0");
            entityBuilder.Property(x => x.TariImpto).IsRequired().HasDefaultValueSql("19");
            entityBuilder.Property(x => x.Total).IsRequired().HasDefaultValueSql("0");

            entityBuilder
                .HasOne<Factura>(sc => sc.Factura)
                .WithMany(s => s.FacturaDetalle)
                .HasForeignKey(sc => sc.FacturaId)
                .OnDelete(DeleteBehavior.Restrict);

            entityBuilder
                .HasOne<Producto>(sc => sc.Producto)
                .WithMany(s => s.FacturaDetalle)
                .HasForeignKey(sc => sc.ProductoId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}