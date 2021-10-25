using System;
using System.Collections.Generic;
using System.Text;

namespace DomainLayer
{
    public class FacturaDetalle
    {
        public int FacturaDetalleId { get; set; }        
        public int FacturaId { get; set; }
        public virtual Factura Factura { get; set; }
        public int ProductoId { get; set; }
        public string Nombreproducto { get; set; }
        public virtual Producto Producto { get; set; }
        public int Cantidad { get; set; }
        public int PrecioUnitario { get; set; }
        public int Descuento { get; set; }
        public int TariDesc { get; set; }
        public int Impuesto { get; set; }
        public int TariImpto { get; set; }
        public int Total { get; set; }
    }
}
