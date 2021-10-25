using System;
using System.Collections.Generic;

namespace DomainLayer
{
    public class Factura
    {
        public int FacturaId { get; set; }
        public int NumeroFactura { get; set; }        
        public DateTime Fecha { get; set; }
        public string TipodePago { get; set; }
        public string DocumentoCliente { get; set; }
        public string NombreCliente { get; set; }
        public int Subtotal { get; set; }
        public int Descuento { get; set; }
        public int IVA { get; set; }
        public int TotalDescuento { get; set; }
        public int TotalImpuesto { get; set; }
        public int Total { get; set; }
        public List<FacturaDetalle> FacturaDetalle { get; set; }
    }
}
