using DomainLayer;
using DtoLayer;
using PersistenceLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterfacesLayer
{
    public interface IProductoService
    {
        List<Producto> ObtenerProductos();
        Producto ObtenerProductoID(int vProductoID);
        object CrearProducto(ProductoDto data);
        object ActualizarProducto(int vProductoID, ProductoDto data);
        Boolean EliminarProducto(int vProductoID);
    }
}  