import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../../Servicios/producto.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { CommonService } from '../../../common.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal.producto.component.html',
})
export class ModalProductoComponent {
  public formProducto: FormGroup;
  name: string;
  public dt = new Date();
  @Input() id = null;
  startDate = { year: this.dt.getFullYear(), month: this.dt.getMonth() + 1, day: 1 };
  public alertModal = swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 4000
  });

  constructor(public activeModal: NgbActiveModal, private vServicio: ProductoService,
    private roter: Router) {
  }

  //-----------------------------------------------------------------------------------------------Modal Producto

  ngOnInit(): void {
    this.formProducto = new FormGroup({
      codigo: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      nombre: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      descripcion: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      precio: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      stockmin: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      stockmax: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      //dateOfBirth: new FormControl(null, [Validators.required]),
      //image: new FormControl('', [Validators.required]),
    })
    console.log(this.id, "id pa modal dentro");
    this.CargarProducto(this.id);
  }

  CargarProducto(id) {
    if (id == null) {
      return false;
    }

    this.vServicio.obtenerProductoxID(id).subscribe(
      (res: any) => {
        var formulario = res;
        //this.frmFormulario.get('codigo').disable({ onlySelf: true });
        if (formulario !== null && formulario !== undefined) {
          this.formProducto.get('codigo').setValue(formulario.codigo);
          this.formProducto.get('nombre').setValue(formulario.nombre);
          this.formProducto.get('descripcion').setValue(formulario.descripcion);
          this.formProducto.get('precio').setValue(formulario.precioVenta);
          this.formProducto.get('stockmin').setValue(formulario.stockMinimo);
          this.formProducto.get('stockmax').setValue(formulario.stockMaximo);
        } else {
          this.cerrarModal(true);
        }
      },
      (error) => {
        this.alertModal.fire({ icon: 'error', title: "Se produjo un error!" });
      }
    );
  }



  AgregarProducto() {

    //let valor = Number(this.setearValor(this.formProducto.get("precio").value, 0));

    let item =
    {
      id_producto: Number(this.id)
      , codigo: this.formProducto.get("codigo").value
      , nombre: this.formProducto.get("nombre").value
      , descripcion: this.formProducto.get("descripcion").value
      , precioVenta: Number(this.formProducto.get("precio").value)
      , stockMinimo: Number(this.formProducto.get("stockmin").value)
      , stockMaximo: Number(this.formProducto.get("stockmax").value)
    }

    this.vServicio.guardarProducto(item, this.id).subscribe((res: any) => {
      this.alertModal.fire({ icon: res.status, title: "Se Guardo Correctamente..." });
      this.cerrarModal(true);
    });
  }

  public cerrarModal(cerrar = null) {
    this.activeModal.close(cerrar);
  }  
}
