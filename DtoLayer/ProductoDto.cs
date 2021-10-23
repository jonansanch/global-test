using System;
using System.Collections.Generic;
using System.Text;

namespace DtoLayer
{
    public class ProductoDto
    {
        public int ProductoId { get; set; }
        public string NomProducto { get; set; }
        public int TariDescuento { get; set; }
        public List<FacturaDetalleDto> FacturaDetalle { get; set; }
    }
}
