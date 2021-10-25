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
    public class FacturaService : IFacturaService
    {
        private readonly IMapper _mapper;
        private readonly ContextDb context;
        public FacturaService(IMapper mapper, ContextDb _context)
        {
            _mapper = mapper;
            context = _context;
        }
        public List<Factura> ObtenerFacturas()
        {
            var lis = context.Factura.ToList();
            return lis;
        }

        public FacturaDto ObtenerFacturaxID(int vFacturaID)
        {
            var factura = context.Factura
                                .Include(c => c.FacturaDetalle)
                                .ThenInclude(c => c.Producto)
                                .Where(e => e.FacturaId == vFacturaID)
                                .FirstOrDefault();
            //var detalles = context.FacturaDetalle
            //                        .Include(c => c.Producto)
            //                        .Where(e => e.FacturaId == vFacturaID).ToList();
            //factura.FacturaDetalle = detalles;

            if (factura == null)
                return null;

            return _mapper.Map<FacturaDto>(factura); ;
        }

        public object CrearFactura(Factura data)
        {
            using (var transaction = context.Database.BeginTransaction())
            {
                try
                {
                    var num = (from e in context.Factura orderby e.NumeroFactura descending select e.NumeroFactura).FirstOrDefault();

                    Factura factura = new Factura
                    {
                        NumeroFactura = num == 0 ? 1 : num + 1,
                        Fecha = DateTime.Now,//data.Fecha, //DateTime.Now,
                        TipodePago = data.TipodePago,
                        DocumentoCliente = data.DocumentoCliente,
                        NombreCliente = data.NombreCliente,
                        Subtotal = 0,
                        Descuento = 0,
                        IVA = 19,
                        TotalDescuento = 0,
                        TotalImpuesto = 0,
                        Total = 0
                    };

                    context.Factura.Add(factura);
                    context.SaveChanges();

                    int totaldesc = 0;
                    int totalimp = 0;
                    int total = 0;
                    int subtotal = 0;
                    Producto produc = new Producto();// = await context.Producto.SingleAsync(c => c.ProductoId == 1);

                    foreach (var f in data.FacturaDetalle)
                    {
                        FacturaDetalle detalle = new FacturaDetalle
                        {
                            FacturaId = factura.FacturaId,
                            ProductoId = f.ProductoId,
                            Cantidad = f.Cantidad,
                            PrecioUnitario = f.PrecioUnitario
                        };

                        produc = context.Producto.Single(c => c.ProductoId == f.ProductoId);

                        if (produc != null)
                        {
                            var tarifa = produc.TariDescuento > 0 ? produc.TariDescuento : 0;
                            var tmp = (f.PrecioUnitario * f.Cantidad);
                            var desc = (tmp * tarifa) / 100;
                            var impto = ((tmp - desc) * 19) / 100;
                            var totaltmp = (tmp - desc) + impto;

                            detalle.Nombreproducto = produc.NomProducto;
                            detalle.Descuento = desc;
                            detalle.TariDesc = tarifa;
                            detalle.Impuesto = impto;
                            detalle.TariImpto = 19;
                            detalle.Total = totaltmp;

                            totaldesc += desc;
                            totalimp += impto;
                            subtotal += tmp;
                            total += totaltmp;
                        }
                        context.FacturaDetalle.Add(detalle);
                    }

                    factura.Subtotal = subtotal;
                    factura.Descuento = 0;
                    factura.IVA = 19;
                    factura.TotalDescuento = totaldesc;
                    factura.TotalImpuesto = totaldesc;
                    factura.Total = totaldesc;

                    context.Update(factura);
                    context.SaveChanges();

                    transaction.Commit();
                    return new
                    {
                        data = true,
                        status = "success",
                        msg = "success_save"
                    };

                }
                catch (Exception e)
                {
                    return new
                    {
                        data = false,
                        status = "error" + e.Message,
                        msg = "error_modify"
                    };
                }
            }
        }

        public object ActualizarFactura(int vFacturaId, Factura data)
        {
            using (var transaction = context.Database.BeginTransaction())
            {
                try
                {
                    var factura = context.Factura.Find(vFacturaId);

                    if (factura == null)
                    {
                        return new
                        {
                            data = false,
                            status = "error",
                            msg = "error_modify"
                        };
                    }

                    //DELETE Detalles factura                    
                    var lstOriginal = context.FacturaDetalle
                                              .Where(e => e.FacturaId == vFacturaId)
                                              .ToList();

                    context.FacturaDetalle.RemoveRange(lstOriginal);
                    context.SaveChanges();

                    int totaldesc = 0;
                    int totalimp = 0;
                    int total = 0;
                    int subtotal = 0;
                    Producto produc; //= new Producto();// = await context.Producto.SingleAsync(c => c.ProductoId == 1);

                    foreach (var f in data.FacturaDetalle)
                    {
                        FacturaDetalle detalle = new FacturaDetalle
                        {
                            FacturaId = factura.FacturaId,
                            ProductoId = f.ProductoId,
                            Cantidad = f.Cantidad,
                            PrecioUnitario = f.PrecioUnitario
                        };

                        produc = new Producto();
                        produc = context.Producto.Where(c => c.ProductoId == f.ProductoId).FirstOrDefault();

                        if (produc != null)
                        {
                            var tarifa = produc.TariDescuento > 0 ? produc.TariDescuento : 0;
                            var tmp = (f.PrecioUnitario * f.Cantidad);
                            var desc = (tmp * tarifa) / 100;
                            var impto = ((tmp - desc) * 19) / 100;
                            var totaltmp = (tmp - desc) + impto;

                            detalle.Nombreproducto = produc.NomProducto;
                            detalle.Descuento = desc;
                            detalle.TariDesc = tarifa;
                            detalle.Impuesto = impto;
                            detalle.TariImpto = 19;
                            detalle.Total = totaltmp;

                            totaldesc += desc;
                            totalimp += impto;
                            subtotal += tmp;
                            total += totaltmp;
                        }
                        context.FacturaDetalle.Add(detalle);
                    }

                    factura.NombreCliente = data.NombreCliente;
                    factura.Subtotal = subtotal;
                    factura.TotalDescuento = totaldesc;
                    factura.TotalImpuesto = totalimp;
                    factura.Total = total;


                    context.Update(factura);

                    context.SaveChanges();

                    transaction.Commit();
                    return new
                    {
                        data = true,
                        status = "success",
                        msg = "success_save"
                    };
                }
                catch (Exception e)
                {
                    return new
                    {
                        data = false,
                        status = "error",
                        msg = "error_modify" + e.Message
                    };
                }
            }
        }
        public Boolean EliminarFactura(int vFacturaId)
        {
            try
            {
                var factura = context.Factura.Find(vFacturaId);
                if (factura == null)
                {
                    return false;
                }

                //DELETE Detalles factura                    
                var lstOriginal = context.FacturaDetalle
                                          .Where(e => e.FacturaId == factura.FacturaId)
                                          .ToList();

                context.FacturaDetalle.RemoveRange(lstOriginal);

                context.Factura.Remove(factura);
                context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public ObjListados ObtenerListados()
        {
            var Produc = context.Producto.ToList();

            ObjListados item = new ObjListados();

            item.lisProducto = _mapper.Map<List<ProductoDto>>(Produc);

            return item;
        }
    }
}
