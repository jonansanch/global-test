import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
//import { TextMaskModule } from 'angular2-text-mask';
import { NgbActiveModal, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

//Menu
import { NavMenuComponent } from './nav-menu/nav-menu.component';

//Componentes
import { HomeComponent } from './home/home.component';

//Producto
import { ProductoComponent } from './components/producto/producto.component';
import { ModalProductoComponent } from './components/producto/modal.producto/modal.producto.component';
import { ProductoService } from './Servicios/producto.service';

//Facturas
import { FacturaComponent } from './components/factura/factura.component';
import { ModalFactura } from './components/factura/modal.factura/modal.factura.component';
import { FacturaService } from './Servicios/factura.service';


//import { NgSelectModule } from '@ng-select/ng-select';


//rutas menu
import { APP_ROUTING } from '../app/app.route'

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,    
    ProductoComponent,
    ModalProductoComponent,
    FacturaComponent,
    ModalFactura,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),            
    CommonModule,        
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    //NgSelectModule,
    //TextMaskModule,    
    APP_ROUTING,    
  ],
  providers: [
    ProductoService,
    FacturaService,
    NgbActiveModal,
  ],
  entryComponents: [
    NavMenuComponent,
    HomeComponent,    
    ProductoComponent,
    ModalProductoComponent,
    FacturaComponent,
    ModalFactura,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
