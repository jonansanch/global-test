using AutoMapper;
using DomainLayer;
using DtoLayer;
using InterfacesLayer;
using Microsoft.EntityFrameworkCore;
using PersistenceLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public class ProductoService : IProductoService
    {
        private readonly IMapper _mapper;
        private readonly ContextDb context;
        public ProductoService(IMapper mapper, ContextDb _context)
        {
            _mapper = mapper;
            context = _context;
        }
        public List<Producto> ObtenerProductos()
        {
            return context.Producto.ToList();
        }

        public Producto ObtenerProductoID(int vProductoID)
        {
            var productos = context.Producto.Single(e => e.ProductoId == vProductoID);
            return productos;
        }

        public object CrearProducto(ProductoDto data)
        {
            try
            {
                Producto producto = new Producto();

                producto.NomProducto = data.NomProducto;
                producto.TariDescuento = data.TariDescuento;

                context.Producto.Add(producto);
                context.SaveChanges();

                return new
                {
                    data = true,
                    status = "success",
                    msg = "success_save"
                };

            }
            catch (DbUpdateConcurrencyException)
            {
                return new
                {
                    data = false,
                    status = "error",
                    msg = "error_modify"
                };
            }
        }

        public object ActualizarProducto(int vProductoID, ProductoDto data)
        {
            try
            {
                var producto = context.Producto.Find(vProductoID);

                if (producto == null)
                {
                    return new
                    {
                        data = false,
                        status = "error",
                        msg = "error_modify"
                    };
                }

                producto.NomProducto = data.NomProducto;
                producto.TariDescuento = data.TariDescuento > 0 ? data.TariDescuento : 0;

                context.Update(producto);
                context.SaveChanges();

                return new
                {
                    data = true,
                    status = "success",
                    msg = "success_save"
                };
            }
            catch (DbUpdateConcurrencyException)
            {
                return new
                {
                    data = false,
                    status = "error",
                    msg = "error_modify"
                };
            }
        }
        public Boolean EliminarProducto(int vProductoID)
        {
            try
            {
                var producto = context.Producto.Find(vProductoID);
                if (producto == null)
                {
                    return false;
                }
                context.Producto.Remove(producto);
                context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}

