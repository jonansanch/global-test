import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ModalProducto } from './components/producto/modal.producto/modal.producto.component';

import { ProductoService } from './Servicios/producto.service';

import { TextMaskModule } from 'angular2-text-mask';
import { NgbActiveModal, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
//import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProductoComponent,
    ModalProducto
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
    TextMaskModule,    

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'producto', component: ProductoComponent },
    ])
  ],
  providers: [
    ProductoService,
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
