import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }
  
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return  {
      headers: {
        'x-token': this.token
      }
    }
  }

  obtenerHospitales(){

    return this.http.get(`${base_url}/hospitales`, this.headers)
    .pipe(
      map( (resp: any) => resp.hospitales as Hospital[])
    );
       
  }

  crearHospital(nombre: string){

    return this.http.post(`${base_url}/hospitales`, { nombre }, this.headers); 
  }

  actualizarHospital(_id : string, nombre: string){

    return this.http.put(`${base_url}/hospitales/${ _id }`, { nombre }, this.headers); 
  }

  borrarHospital(_id : string){

    return this.http.delete(`${base_url}/hospitales/${ _id }`, this.headers); 
  }
}
