using DomainLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace PersistenceLayer
{
    public class ProductoConfig
    {
        public ProductoConfig(EntityTypeBuilder<Producto> entityBuilder)
        {
            entityBuilder.Property(x => x.NomProducto).IsRequired().HasMaxLength(100);
            entityBuilder.Property(x => x.TariDescuento).IsRequired().HasDefaultValueSql("0");            
        }
    }
}