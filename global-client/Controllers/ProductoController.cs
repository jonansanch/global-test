using DomainLayer;
using DtoLayer;
using InterfacesLayer;
using Microsoft.AspNetCore.Mvc;
using PersistenceLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace global_client.Controllers
{
    [Route("api/producto")]
    [ApiController]
    public class ProductoController : ControllerBase
    {        
        IProductoService _service;
        public ProductoController(IProductoService vService)
        {            
            _service = vService;
        }

        [HttpGet]
        [Route("data")]
        public List<Producto> data()
        {
            return _service.ObtenerProductos();
        }

        [HttpGet]
        [Route("getProductoxID/{vProductoID}")]
        public Producto getProductoxID(int vProductoID)
        {
            return _service.ObtenerProductoID(vProductoID);
        }

        [HttpPost]
        [Route("create")]
        public object Create([FromBody()] ProductoDto producto)
        {
            return _service.CrearProducto(producto);
        }

        [HttpPut]
        [Route("update/{vProductoID}")]
        public object Update(int vProductoID, [FromBody()] ProductoDto producto)
        {
            var query = _service.ActualizarProducto(vProductoID, producto);
            return query;
        }

        [HttpDelete]
        [Route("delete/{vProductoID}")]
        public object Delete(int vProductoID)
        {
            var query = _service.EliminarProducto(vProductoID);
            return new
            {
                data = query,
                status = "success",
                msg = "success_save"
            };
        }
    }
}
