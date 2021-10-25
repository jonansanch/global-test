import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class FacturaService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    console.log('Listo pa usar el servicio');

  }
  //-----------------------------------------------------------------------------------------------Producto

  obtenerFacturas() {
    var url = this.baseUrl + "api/factura/data";
    return this.http.get(url).pipe(map(response => response), catchError(this.handleError));
  }

  obtenerFacturaxID(id) {    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (id === null || id === undefined) { id = 0; }
    var url = this.baseUrl + "api/factura/getFacturaxID/" + id
    return this.http.get(url).pipe(map(response => response), catchError(this.handleError));
  }

  guardarFactura(data, id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    var url = this.baseUrl + "api/factura/create";
    console.log(url);
    if (id === null || id === undefined) {
      return this.http.post(this.baseUrl + "api/factura/create/", JSON.stringify(data), { headers: headers });
    } else {
      return this.http.put(this.baseUrl + "api/factura/update/" + id, JSON.stringify(data), { headers: headers });
    }
  }

  eliminarFactura(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    var url = this.baseUrl + "api/factura/delete/" + id;
    return this.http.delete(url, { headers: headers });
  }

  getListados() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    var url = this.baseUrl + "api/factura/getListados/"
    return this.http.get(url).pipe(map(response => response), catchError(this.handleError));
  }

  protected handleError(error: HttpErrorResponse) {
    // return an observable with a user friendly message
    return throwError('Error!.');
  }
}
