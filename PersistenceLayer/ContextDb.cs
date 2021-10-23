using System;
using DomainLayer;
using Microsoft.EntityFrameworkCore;

namespace PersistenceLayer
{
    public class ContextDb : DbContext
    {
        public ContextDb(DbContextOptions<ContextDb> options) : base(options)
        {
            ChangeTracker.AutoDetectChangesEnabled = false;
            ChangeTracker.LazyLoadingEnabled = false;
        }

        public DbSet<Factura> Factura { get; set; }
        public DbSet<FacturaDetalle> FacturaDetalle { get; set; }        
        public DbSet<Producto> Producto { get; set; }        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            ModelConfig(builder);
        }

        private void ModelConfig(ModelBuilder modelBuilder)
        {
            new FacturaConfig(modelBuilder.Entity<Factura>());
            new FacturaDetalleConfig(modelBuilder.Entity<FacturaDetalle>());
            new ProductoConfig(modelBuilder.Entity<Producto>());            
        }
    }
}
