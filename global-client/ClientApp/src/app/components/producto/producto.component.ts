import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService, } from '../../Servicios/producto.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProductoComponent } from './modal.producto/modal.producto.component'
import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { compileNgModule } from '@angular/compiler';
import { CommonService } from '../../common.service';

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

  //constructor(private vServicio: ProductoService, private modalService: NgbModal, public activeModal: NgbActiveModal, public commonService: CommonService,private http: HttpClient,
  //  private roter: Router) {
  //} 

  constructor(private vServicio: ProductoService, private modalService: NgbModal, public activeModal: NgbActiveModal, private http: HttpClient,
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
      this.objetos = res;      
    });
  };

  editar(vId: number) {    
    this.AbrirModal(vId);
  }

  eliminar(vId: number) {
    this.vServicio.eliminarProducto(vId).subscribe((r: any) => {      
      if (r.data == false) {
        this.alertModal.fire({ icon: "warning", title: "No se pudo eliminar el registro favor validar por favor revisar" });
        return
      }
      this.alertModal.fire({ icon: "warning", title: "Eliminado exitosamente" });
      this.rerender();
    });
  }

  ////Evento para abrir el componente en el modal 
  AbrirModal(id) {    
    this.modal = this.modalService.open(ModalProductoComponent, {
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
}
