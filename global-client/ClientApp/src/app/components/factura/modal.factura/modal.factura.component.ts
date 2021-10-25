import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacturaService } from '../../../Servicios/factura.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
//import { NgSelectModule } from '@ng-select/ng-select';
import { fromEventPattern } from 'rxjs';
import { CommonService } from '../../../common.service';

@Component({
  selector: 'app-modal-factura',
  templateUrl: './modal.factura.component.html',
})
export class ModalFactura {
  public formFactura: FormGroup;
  name: string;
  public dt = new Date();
  @Input() id = null;
  selectTipoPago = ["Contado", "Credito"];
  selectProducto = [];
  facturaDetalle: any[] = [];
  nuevo: boolean = false;
  ocultar: boolean = false;
  nomproudcto
  startDate = { year: this.dt.getFullYear(), month: this.dt.getMonth() + 1, day: 1 };
  minDate = { year: this.dt.getFullYear(), month: this.dt.getMonth() + 1, day: this.dt.getDay() + 10 };
  //maxDate = { year: this.dt.getFullYear(), month: 12, day: 1 }
  public alertModal = swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 4000
  });

  //-----------------------------------------------------------------------------------------------Modal Factura

  constructor(private vServicio: FacturaService, public activeModal: NgbActiveModal,
    private roter: Router) {
  }

  ngOnInit(): void {
    this.formFactura = new FormGroup({
      tipopago: new FormControl(null),
      fecha: new FormControl(null, [Validators.required, Validators.maxLength(12)]),
      nodoc: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      nombre: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      producto: new FormControl(null),
      cantidad: new FormControl(null),
      valor: new FormControl(null),
      //dateOfBirth: new FormControl(null, [Validators.required]),
      //image: new FormControl('', [Validators.required]),
    })
    this.CargarListados();
    this.CargarFactura(this.id);    
    this.minDate = { year: this.dt.getFullYear(), month: this.dt.getMonth() + 1, day: this.convertirFechaObjeto(this.dt.toISOString(), false).day };
  }

  CargarListados() {
    this.vServicio.getListados().subscribe(
      (res: any) => {
        let accion = res;
        if (accion !== null && accion !== undefined) {
          //this.selectProveedor = accion.lisProveedor
          this.selectProducto = accion.lisProducto
        }
      },
      (error) => {
        this.alertModal.fire('Error', "Se ha producido un error!", 'error');
      }
    )
  }

  CargarFactura(id) {
    if (id == null) {
      this.nuevo = true
      return false;
    }
    this.nuevo = true
    this.vServicio.obtenerFacturaxID(Number(id)).subscribe(
      (res: any) => {
        var formulario = res;
        //this.frmFormulario.get('codigo').disable({ onlySelf: true });
        if (formulario !== null && formulario !== undefined) {
          this.formFactura.get('tipopago').setValue(formulario.tipodePago);
          this.formFactura.get('fecha').setValue(this.convertirFechaObjeto(formulario.fecha, false));
          this.formFactura.get("nodoc").setValue(formulario.documentoCliente);
          this.formFactura.get("nombre").setValue(formulario.nombreCliente);
          this.facturaDetalle = formulario.facturaDetalle

          if (formulario.estado == 2) {
            this.formFactura.disable({ onlySelf: true });
            this.ocultar = true;
          }

        } else {
          this.cerrarModal(true);
        }
      },
      (error) => {
        console.log("Error")
      }
    );
  }



  AgregarFactura() {
    let tipo = this.formFactura.get("tipopago").value;
    let fecha = this.formFactura.get("fecha").value
    let nodoc = this.formFactura.get("nodoc").value
    let nombre = this.formFactura.get("nombre").value

    if (tipo === undefined || tipo === null || fecha === undefined || fecha === null || nodoc === undefined || nodoc === null || nombre === undefined || nombre === null) {
      this.alertModal.fire({ icon: 'warning', title: "Todos los campos son obligatorios, favor diligenciarlos" });
      return;
    }

    if (this.facturaDetalle.length <= 1) {
      this.alertModal.fire({ icon: 'warning', title: "La factura debe tener minimo un producto" });
      return;
    }

    console.log(fecha);

    let item =
    {
      facturaId: Number(this.id)
      , fecha: this.convertirArrayFecha(fecha, true)
      , tipodePago: this.formFactura.get("tipopago").value
      , documentoCliente: nodoc//this.formFactura.get("nodoc").value
      , nombreCliente: nombre//this.formFactura.get("nombre").value
      , facturaDetalle: this.facturaDetalle
    }
    this.vServicio.guardarFactura(item, this.id).subscribe((res: any) => {
      this.alertModal.fire({ icon: res.status, title: "Se Guardo Correctamente..." });
      this.cerrarModal(true);
    });
  }


  agregarDetalle() {
    if (this.facturaDetalle == null) {
      this.facturaDetalle = [];
    }

    const that = this;
    let producto = that.formFactura.get("producto").value
    let cantidad = Number(that.formFactura.get("cantidad").value) === null ? 0 : Number(that.formFactura.get("cantidad").value)
    let valor = Number(that.formFactura.get("valor").value) === null ? 0 : Number(that.formFactura.get("valor").value)

    if (producto === undefined || producto === null || cantidad === null || valor === null) {
      this.alertModal.fire({ icon: 'warning', title: "Todos los campos son obligatorios, favor diligenciarlos" });
      return;
    }

    if (cantidad <= 0) {
      this.alertModal.fire({ icon: 'warning', title: "La cantidad debe ser mayor a 0" });
      return;
    }

    if (valor <= 0) {
      this.alertModal.fire({ icon: 'warning', title: "El precio unitario debe ser mayor a 0" });
      return;
    }


    let productoid = Number(producto.split("-")[0])



    let item = this.facturaDetalle.find(x => x.productoId == productoid);
    if (item != null) {
      this.alertModal.fire({ icon: 'warning', title: "No se puede agregar 2 veces el mismo producto ni valores nulos" });
      return;
    }


    that.facturaDetalle.push({
      productoId: Number(producto.split("-")[0])
      , nombreproducto: this.nomproudcto
      , cantidad: cantidad
      , precioUnitario: valor
    });

    this.formFactura.get("producto").setValue(null);
    this.formFactura.get("cantidad").setValue(0);
    this.formFactura.get("valor").setValue(0);
  }

  editarDetalle(productoId) {
    let item = this.facturaDetalle.find(x => x.productoId == productoId);
    var index: number = this.facturaDetalle.indexOf(this.facturaDetalle.find(x => x.productoId == productoId));

    var nomproduc = item.productoId + '-' + item.nombreproducto;
    this.formFactura.get("producto").setValue(nomproduc);
    this.formFactura.get("cantidad").setValue(item.cantidad);
    this.formFactura.get("valor").setValue(Number(item.precioUnitario));
    this.nomproudcto = item.nombreproducto;

    this.facturaDetalle.splice(index, 1);
  }

  eliminarDetalle(productoId) {
    var index: number = this.facturaDetalle.indexOf(this.facturaDetalle.find(x => x.productoId == productoId));
    this.facturaDetalle.splice(index, 1);
  }

  LimpiarDetalle() {
    this.formFactura.get("producto").setValue(null);
    this.formFactura.get("cantidad").setValue(0);
    this.formFactura.get("valor").setValue(0);
  }

  nombreproducto(e) {
    let valor = this.formFactura.get("producto").value;
    this.nomproudcto = valor.split("-")[1] //valor.split("-")    
  }

  public cerrarModal(cerrar = null) {
    this.activeModal.close(cerrar);
  }

  convertirArrayFecha(fecha, ymd = false) {
    if (fecha != null && fecha != undefined) {
      ymd = typeof ymd !== 'undefined' ? ymd : false;
      if (ymd) {
        return fecha.year + '-' + fecha.month.toString().padStart(2, 0) + '-' + fecha.day.toString().padStart(2, 0);
      }
      else {
        return fecha.year + '-' + fecha.month + '-' + fecha.day + 'T00:00:00.000';
      }
    }
    else
      return null;
  }

  convertirFechaObjeto(fecha, hora: boolean = false) {
    let objFecha;
    const arrayFechaCompleta = fecha.split('T');
    if (arrayFechaCompleta.length > 0) {
      const arrayFecha = arrayFechaCompleta[0].split('-');
      const arrayFechaHora = arrayFechaCompleta[1].split(':');
      if (arrayFecha.length > 0) {
        objFecha = {
          // tslint:disable-next-line:radix
          day: parseInt(arrayFecha[2]),
          // tslint:disable-next-line:radix
          month: parseInt(arrayFecha[1]),
          // tslint:disable-next-line:radix
          year: parseInt(arrayFecha[0])
        };

        if (hora == true) {
          objFecha = {
            day: objFecha.day,
            month: objFecha.month,
            year: objFecha.year,
            hour: parseInt(arrayFechaHora[0]),
            minute: parseInt(arrayFechaHora[1]),

          }
        }

      }
      if (objFecha.year == 1)
        return "";

      return objFecha;
    }
  }

  //Solo permite introducir numeros.
  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    //console.log("letra " + key )
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
  }

  //Solo permite introducir letras.
  soloLetras(e) {    
    var key = e.keyCode || e.which,
      tecla = String.fromCharCode(key).toLowerCase(),
      letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
      especiales = [8, 39, 46],
      tecla_especial = false;
    //console.log("letra")
    //console.log(e.keyCode)
    //console.log(e.which)
    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
  }


  //limpia caja de texto cuando pegan numeros con ctrl + v
  limpia(campo) {
    var val = this.formFactura.get(campo).value //document.getElementById(campo).value;
    var tam = val.length;
    for (var i = 0; i < tam; i++) {
      if (val[i] == " ")
        continue
      if (!isNaN(val[i]) || val[i] == "%")
        this.formFactura.get(campo).setValue("");
        //document.getElementById(campo).value = '';
    }
  }
}
