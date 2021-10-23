import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService, } from '../../Servicios/producto.service';
import { NgbActiveModal, NgbModal } from 'bootstrap' //'@ng-bootstrap/ng-bootstrap';
import { ModalProducto } from './modal.producto/modal.producto.component'
import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { compileNgModule } from '@angular/compiler';
import { CommonService } from '../../common.service';
//import createNumberMask from 'text-mask-core'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
  ],
})

//-----------------------------------------------------------------------------------------------Producto
export class ProductoComponent implements OnInit {
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

  constructor(private vServicio: ProductoService, private modalService: NgbModal, public activeModal: NgbActiveModal, public commonService: CommonService, private http: HttpClient,
    private roter: Router) {
  }

  ngOnInit(): void {
    this.ObtenerProductos();
  }

  rerender(): void {
    this.ObtenerProductos();
  }

  //Obtener estudiantes desde los servicios 
  ObtenerProductos() {
    this.vServicio.obtenerProductos().subscribe((res: any[]) => {
      console.log(res);
      this.objetos = res;
      console.log("Objeto")
      console.log(this.objetos);

    });
  };

  editar(vId: number) {
    this.AbrirModal(vId);
  }

  eliminar(vId: number) {
    this.vServicio.eliminarProducto(vId).subscribe((r: any) => {
      this.alertModal.fire({ icon: "warning", title: "Eliminado exitosamente" });
      this.rerender();
    });
  }

  //Evento para abrir el componente en el modal 
  AbrirModal(id) {
    console.log(id, "id pa modal");
    this.modal = this.modalService.open(ModalProducto, {
      size: 'lg',
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

  

  post(obj, url) {
    var mapForm = document.createElement("form");
    mapForm.target = "_blank";
    mapForm.method = "POST"; // or "post" if appropriate
    mapForm.action = url;
    Object.keys(obj).forEach(function (param) {
      var mapInput = document.createElement("input");
      mapInput.type = "hidden";
      mapInput.name = param;
      mapInput.setAttribute("value", obj[param]);

      mapForm.appendChild(mapInput);
    });
    document.body.appendChild(mapForm);
    mapForm.submit();
  }
}