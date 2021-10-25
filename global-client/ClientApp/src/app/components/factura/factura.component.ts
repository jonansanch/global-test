import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacturaService } from '../../Servicios/factura.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { ModalFactura } from './modal.factura/modal.factura.component'
import { ModalFactura } from './modal.factura/modal.factura.component'
import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: [
  ],
})
export class FacturaComponent implements OnInit {
  objetos: any[];
  private modal;
  public accion;
  public proceso_componente = true;
  public prmBuscadorDatatable = 80;
  public alertModal = swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 4000
  });

  constructor(private vServicio: FacturaService,private modalService: NgbModal, public activeModal: NgbActiveModal,
    private roter: Router) {
  }

  //-----------------------------------------------------------------------------------------------Facturas

  ngOnInit(): void {    
    this.ObtenerFacturas();
  }

  rerender(): void {
    this.ObtenerFacturas();
  }

  //Obtener estudiantes desde los servicios 
  ObtenerFacturas() {
    this.vServicio.obtenerFacturas().subscribe((r: any[]) => {      
      this.objetos = r;
      if (this.objetos !== null) {
        const that = this;
        this.objetos.forEach(function (value) {          
          value.fecha = that.convertirFecha(value.fecha, false)          
        });        
      }
      this.objetos = r;      
    });
  };

  editar(vId: number) {
    this.AbrirModal(vId);
  }

  eliminar(vId: number) {
    this.vServicio.eliminarFactura(vId).subscribe((r: any) => {
      if (r.data == false) {
        this.alertModal.fire({ icon: "warning", title: "No se pudo eliminar el registro favor validar por favor revisar" });
        return
      }
      this.alertModal.fire({ icon: "warning", title: "Eliminado exitosamente" });
      this.rerender();      
    });
  }

  //Evento para abrir el componente en el modal 
  AbrirModal(id) {
    this.modal = this.modalService.open(ModalFactura, {
      size: 'xl',
      backdrop: 'static',
      keyboard: false
    });
    this.modal.componentInstance.id = id;
    /* Evento que se ejecuta despues de guardar o cancelar en el modal */
    this.modal.result.then((result) => {
      if (result !== null) {
        this.rerender();
      }
    });
  }

  // convierte una fecha yy/mm/dd hh:ii:ss a yy/mm/dd
  convertirFecha(fecha, hora: boolean = false) {    
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

      if (hora == false)
        return objFecha.day + "/" + objFecha.month.toString().padStart(2, 0) + "/" + objFecha.year
      return objFecha.day + "/" + objFecha.month.toString().padStart(2, 0) + "/" + objFecha.year + " " + objFecha.hour.toString().padStart(2, 0) + ":" + objFecha.minute.toString().padStart(2, 0);
    }
  }
}
