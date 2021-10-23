using System;
using System.Collections.Generic;
using System.Text;

namespace DomainLayer
{
    public class Producto
    {
        public int ProductoId { get; set; }        
        public string NomProducto { get; set; }
        public int TariDescuento { get; set; }
        public List<FacturaDetalle> FacturaDetalle { get; set; }
    }
}
