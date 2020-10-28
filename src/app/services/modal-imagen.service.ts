import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultar: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultar;
  }

  constructor() { }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-img') {
    this._ocultar = false;
    this.tipo = tipo;
    this.id = id;
    if (img.includes('https'))
      this.img = img;
    else
      this.img = `${ base_url }/upload/${ tipo }/${ img }`;
  }

  cerrarModal() {
    this._ocultar = true;

  }
}
