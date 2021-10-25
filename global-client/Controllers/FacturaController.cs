using DomainLayer;
using DtoLayer;
using InterfacesLayer;
using Microsoft.AspNetCore.Mvc;
using PersistenceLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace global_client.Controllers
{
    [Route("api/factura")]
    [ApiController]
    public class FacturaController : ControllerBase
    {
        private readonly ContextDb context;
        IFacturaService _service;
        IProductoService _productservice;
        public FacturaController(ContextDb vContext, IFacturaService vService,IProductoService vProductservice)
        {
            context = vContext;
            _service = vService;
            _productservice = vProductservice;
        }

        [HttpGet]
        [Route("data")]
        public List<Factura> data()
        {
            return _service.ObtenerFacturas();
        }

        [HttpGet]
        [Route("getFacturaxID/{vFacturaID}")]
        public FacturaDto getFacturaxID(int vFacturaID)
        {
            return _service.ObtenerFacturaxID(vFacturaID);
        }

        [HttpPost]
        [Route("create")]
        public object Create([FromBody()] Factura Factura)
        {
            return _service.CrearFactura(Factura);
        }

        [HttpPut]
        [Route("update/{vFacturaID}")]
        public object Update(int vFacturaID, [FromBody()] Factura Factura)
        {
            var query = _service.ActualizarFactura(vFacturaID, Factura);
            return query;
        }

        [HttpDelete]
        [Route("delete/{vFacturaID}")]
        public object Delete(int vFacturaID)
        {
            var query = _service.EliminarFactura(vFacturaID);
            return new
            {
                data = query,
                status = "success",
                msg = "success_save"
            };
        }

        [HttpGet]
        [Route("getListados")]
        public ObjListados getListados()
        {            
            return _service.ObtenerListados();
        }
    }
}
