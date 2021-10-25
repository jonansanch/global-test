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
      nomProducto: new FormControl(null, [Validators.required, Validators.maxLength(100)]),      
      tariDescuento: new FormControl(null, [Validators.required, Validators.maxLength(15)]),      
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
        console.log(formulario, "respuesta");
        //this.frmFormulario.get('codigo').disable({ onlySelf: true });
        if (formulario !== null && formulario !== undefined) {          
          this.formProducto.get('nomProducto').setValue(formulario.nomProducto);
          this.formProducto.get('tariDescuento').setValue(formulario.tariDescuento);          
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
      productoId: Number(this.id)      
      , nomProducto: this.formProducto.get("nomProducto").value
      , tariDescuento: Number(this.formProducto.get("tariDescuento").value)
    }

    this.vServicio.guardarProducto(item, this.id).subscribe((res: any) => {
      this.alertModal.fire({ icon: res.status, title: "Se Guardo Correctamente..." });
      this.cerrarModal(true);
    });
  }

  public cerrarModal(cerrar = null) {
    this.activeModal.close(cerrar);
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
    var val = this.formProducto.get(campo).value //document.getElementById(campo).value;
    var tam = val.length;
    for (var i = 0; i < tam; i++) {
      if (val[i] == " ")
        continue
      if (!isNaN(val[i]) || val[i] == "%")
        this.formProducto.get(campo).setValue("");
      //document.getElementById(campo).value = '';
    }
  }
}
