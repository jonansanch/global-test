import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductoService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    console.log('Listo pa usar');

  }
  //-----------------------------------------------------------------------------------------------Producto

  obtenerProductos() {
    var url = this.baseUrl + "api/producto/data";
    return this.http.get(url).pipe(map(response => response), catchError(this.handleError));
  }

  obtenerProductoxID(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (id === null || id === undefined) { id = 0; }
    var url = this.baseUrl + "api/producto/getProductoxID/" + id
    return this.http.get(url).pipe(map(response => response), catchError(this.handleError));
  }

  guardarProducto(data, id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (id === null || id === undefined) {
      return this.http.post(this.baseUrl + "api/producto/create/", JSON.stringify(data), { headers: headers });
    } else {
      return this.http.put(this.baseUrl + "api/producto/update/" + id, JSON.stringify(data), { headers: headers });
    }
  }

  eliminarProducto(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    var url = this.baseUrl + "api/producto/delete/" + id;
    return this.http.delete(url, { headers: headers });
  }  

  protected handleError(error: HttpErrorResponse) {
    // return an observable with a user friendly message
    return throwError('Error!.');
  }
}
