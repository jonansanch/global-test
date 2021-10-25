using AutoMapper;
using DomainLayer;
using DtoLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CeibaSoft.Config
{
    public class AutoMaperProfile : Profile
    {
        public AutoMaperProfile()
        {
            // Mapping properties  
            //CreateMap<InventarioFisico, InventarioFisicoDto>().ReverseMap();
            CreateMap<Producto, ProductoDto>().ReverseMap();
            CreateMap<Factura, FacturaDto>().ReverseMap();
            CreateMap<FacturaDetalle, FacturaDetalleDto>().ReverseMap();            
        }
    }
}
