import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
//import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { NgbModal } from 'bootstrap';
import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
//import createNumberMask from 'text-mask-addons/dist/createNumberMask';
// Servicios


declare var QRCode: any;

@Injectable({
  providedIn: 'root'
})

export class CommonService implements OnInit {
  private date = new Date();
  public config: any = {};
  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
  ) {
    const that = this;
  }

  ngOnInit(): void { }

  //mascarasPredeterminadas(mascara, regExp = null, texto = null, cantidad = null) {
  //  let mascaraRetorno;
  //  switch (mascara) {
  //    case 'indicativo':
  //      mascaraRetorno = createNumberMask({
  //        prefix: '+',
  //        suffix: '',
  //        includeThousandsSeparator: false,
  //        integerLimit: 5,
  //      });
  //      break;
  //    case 'dinero':
  //      mascaraRetorno = createNumberMask({
  //        prefix: '$ ',
  //        suffix: '',
  //        includeThousandsSeparator: true,
  //        thousandsSeparatorSymbol: '.',
  //        allowDecimal: true,
  //        decimalSymbol: ',',
  //        decimalLimit: 2,
  //        integerLimit: 11
  //      });
  //      break;
  //    case 'decimale':
  //      mascaraRetorno = createNumberMask({
  //        prefix: '',
  //        suffix: '',
  //        includeThousandsSeparator: true,
  //        thousandsSeparatorSymbol: '.',
  //        allowDecimal: true,
  //        decimalSymbol: ',',
  //        decimalLimit: 2,
  //        integerLimit: 11
  //      });
  //      break;

  //    case 'letras':
  //      mascaraRetorno = this.expresionRegularMask(texto, /[A-Za-zñÑáéíóúÁÉÍÓÚ\s+.:]/); // /[A-Za-zñÑáéíóúÁÉÍÓÚ\s]/g
  //      break;
  //    case 'letrasNumeros':
  //      mascaraRetorno = this.expresionRegularMask(texto, /[0-9A-Za-zñÑáéíóúÁÉÍÓÚ\s+.:'\-']/);
  //      break;
  //    case 'letrasNumerosIones':
  //      mascaraRetorno = this.expresionRegularMask(texto, /[-A-Za-z0-9]/);
  //      break;
  //    case 'numerosregex':
  //      mascaraRetorno = this.expresionRegularMask(texto, /[0-9]/);
  //      break;
  //    case 'alfaNumerico':
  //      mascaraRetorno = this.expresionRegularMask(texto, /[A-Za-z0-9]/);
  //      break;
  //    case 'alfaNumericoNoEspeciales':
  //      mascaraRetorno = this.expresionRegularMask(texto, /[A-Za-z0-9 ñá-ź]+/);
  //      break;
  //    case 'numerosregex':
  //      mascaraRetorno = this.expresionRegularMask(texto, /[0-9]/);
  //      break;
  //    case 'codigo':
  //      mascaraRetorno = this.codigoMaskExtendido(texto);
  //      break;
  //    case 'descripcion':
  //      mascaraRetorno = this.mascaraDescripcion(texto);
  //      break;
  //    case 'nombre':
  //      mascaraRetorno = this.mascaraNombre(texto, /[A-Za-z0-9 ()"ñÁ-Úá-ź]+/, cantidad);
  //      break;
  //    case 'Porcentaje':
  //      mascaraRetorno = createNumberMask({
  //        prefix: '% ',
  //        suffix: '',
  //        includeThousandsSeparator: true,
  //        thousandsSeparatorSymbol: '.',
  //        allowDecimal: true,
  //        decimalSymbol: ',',
  //        decimalLimit: 2,
  //        integerLimit: 3
  //      });
  //      break;
  //    case 'Porcentaje_decimal':
  //      mascaraRetorno = createNumberMask({
  //        prefix: '',
  //        suffix: '%',
  //        includeThousandsSeparator: true,
  //        thousandsSeparatorSymbol: '.',
  //        allowDecimal: true,
  //        decimalSymbol: '.',
  //        decimalLimit: 3,
  //        integerLimit: 2,
  //        requireDecimal: true,
  //        allowLeadingZeroes: true,
  //      });
  //      break;
  //    case 'Numero':
  //      mascaraRetorno = createNumberMask({
  //        prefix: '',
  //        suffix: '',
  //        includeThousandsSeparator: true,
  //        thousandsSeparatorSymbol: '.',
  //        allowDecimal: true,
  //        decimalSymbol: ',',
  //        decimalLimit: 2,
  //        integerLimit: 20
  //      });
  //      break;
  //    case 'NumeroSinDecimales':
  //      mascaraRetorno = createNumberMask({
  //        prefix: '',
  //        suffix: '',
  //        includeThousandsSeparator: false,
  //        allowDecimal: false,
  //        integerLimit: 20
  //      });
  //      break;
  //    case 'Temperatura':
  //      mascaraRetorno = createNumberMask({
  //        prefix: '',
  //        suffix: '',
  //        includeThousandsSeparator: true,
  //        thousandsSeparatorSymbol: '.',
  //        allowDecimal: true,
  //        decimalSymbol: ',',
  //        decimalLimit: 2,
  //        integerLimit: 3
  //      });
  //      break;
  //    case 'Edad':
  //      mascaraRetorno = createNumberMask({
  //        prefix: '',
  //        suffix: '',
  //        decimalLimit: 2,
  //        integerLimit: 2
  //      });
  //      break;
  //    case 'Puntos':
  //      mascaraRetorno = createNumberMask({
  //        prefix: '',
  //        suffix: '',
  //        allowDecimal: true,
  //        decimalSymbol: '.',
  //        decimalLimit: 3,
  //        integerLimit: 3
  //      });
  //      break;
  //    default:
  //      mascaraRetorno = this.numeroMask;
  //      break;
  //  }
  //  return mascaraRetorno;
  //}

  //public numeroMask = createNumberMask({
  //  prefix: '',
  //  suffix: '',
  //  includeThousandsSeparator: false,
  //  allowLeadingZeroes: true
  //});

  //public expresionRegularMask(valor: string, exp): RegExp[] {
  //  const nameMask: RegExp[] = [];
  //  if (exp != null) {
  //    for (let i = 0; i <= 500; i++) {
  //      nameMask.push(exp);
  //    }
  //  }
  //  return nameMask;
  //}

  //codigoMaskExtendido(rawValue: string): RegExp[] {
  //  const maskStr = /[A-Za-z0-9ñá-ź]+/;
  //  const strLength = 20;
  //  const codigoMask: RegExp[] = [];
  //  for (let i = 1; i <= strLength; i++) {
  //    codigoMask.push(maskStr);
  //  }
  //  return codigoMask;
  //}

  //public mascaraDescripcion(valor: string) {
  //  const arregloDescripcion: any = [];
  //  let cant: any = 0;
  //  let arregloLength: any;
  //  const descripcion = valor.split(' ');
  //  descripcion.forEach(element => {
  //    if (element != '') {
  //      arregloDescripcion.push(element);
  //      cant += element.length;
  //    }

  //  });
  //  arregloLength = arregloDescripcion.length;
  //  return { 'cantPalabra': arregloLength, 'cantCaracteres': cant };
  //}

  //public mascaraNombre(valor: string, exp, cantidad): RegExp[] {
  //  const nameMask: RegExp[] = [];
  //  if (exp != null) {
  //    for (let i = 1; i <= cantidad; i++) {
  //      nameMask.push(exp);
  //    }
  //  }
  //  return nameMask;
  //}

  convertirArrayFecha(fecha, ymd = false) {
    if (fecha != null && fecha != undefined) {
      ymd = typeof ymd !== 'undefined' ? ymd : false;
      if (ymd) {
        return fecha.year + '-' + fecha.month.toString().padStart(2, 0) + '-' + fecha.day.toString().padStart(2, 0);
      }
      else {
        return fecha.year + '-' + fecha.month + '-' + fecha.day + 'T00:00:00.000';
      }
    }
    else
      return null;
  }

  convertirFechaObjeto(fecha, hora: boolean = false) {
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

      return objFecha;
    }
  }

  setearValor(valor, cantDecimales = null): Number {
    if (valor == isNaN || valor == null)
      return 0
    if (!isNaN(parseFloat(valor))) {
      return valor;
    };
    if (valor != null && isNaN(parseFloat(valor))) {
      valor = valor.split('.').join('');
      valor = valor.split('$').join('');
      valor = valor.split('%').join('');
      valor = valor.split(' ').join('');
      valor = valor.trim();
      valor = parseFloat(valor.replace(',', '.'));
      var elementovalor = parseFloat(valor);
      if (cantDecimales != null) {
        return parseFloat(elementovalor.toFixed(cantDecimales));
      }
      else {
        return elementovalor;
      }
    }
    else {
      valor = `${valor}`.split('.').join(''); // Esta línea evita que el formato 1.000 (mil) lo convierta en valor 1 (uno)
      var elementovalor = parseFloat(valor);
      if (cantDecimales != null) {
        return parseFloat(elementovalor.toFixed(cantDecimales));
      }
      else {
        return elementovalor;
      }
    }

    if (cantDecimales != null) { valor = valor.toFixed(cantDecimales); }
    return isNaN(valor) ? 0 : valor;
  }

  formatearNumero(num, sepDecimal, separador, cantDecimales, peso = true) {
    num = parseFloat(num).toFixed(cantDecimales);
    if (!isNaN(num)) {
      num += '';
      const splitStr = num.split('.');
      let splitLeft = splitStr[0];
      const splitRight = splitStr.length > 1 ? sepDecimal + splitStr[1] : '';
      const regx = /(\d+)(\d{3})/;
      while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + separador + '$2');
      }
      if (peso) {
        return '$ ' + splitLeft + splitRight;
      }
      else {
        return splitLeft + splitRight;
      }
    }
    return '';
  }
}
