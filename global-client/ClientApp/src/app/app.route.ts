import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductoComponent } from './components/producto/producto.component';
import { FacturaComponent } from './components/factura/factura.component';


const APP_ROUTE: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'factura', component: FacturaComponent },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTE);
