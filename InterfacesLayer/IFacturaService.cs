using DomainLayer;
using DtoLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterfacesLayer
{
    public interface IFacturaService
    {
        List<Factura> ObtenerFacturas();
        FacturaDto ObtenerFacturaxID(int vFacturaId);
        object CrearFactura(Factura data);
        object ActualizarFactura(int vFacturaId, Factura data);
        Boolean EliminarFactura(int vFacturaId);
        ObjListados ObtenerListados();

    }
}
