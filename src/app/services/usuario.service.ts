import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, delay } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role;
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get headers() {
    return  {
      headers: {
        'x-token': this.token
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => { //el tap y map funcionan de manera async, puedo que uno termine antes que el otro
        const { email, google, nombre, role, img, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu));
        return true;
      }),
      catchError(error => of(false)) //of para retornar un nuevo Observable
    );
  }

  crearUsuario(formData: RegisterForm) {
    console.log('Creando Usuario');

    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('menu', JSON.stringify(resp.menu));
        })
      );
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  login(formData: LoginForm) {
    console.log('Login Usuario');

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('menu', JSON.stringify(resp.menu));
        })
      );
  }

  obtenerUsuarios(desde: number = 0){

    return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${desde}`, this.headers)
           .pipe(
             //delay(5000),
             map( resp => {
              const usuarios = resp.usuarios.map(
                user  => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
              );
              return {
                total: resp.total,
                usuarios
              };
             })
           )
  }

  eliminarUsuario(usuario: Usuario){

    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`, this.headers);
  }

  actualizarUsuario(data: Usuario) {

    return this.http.put(`${base_url}/usuarios/${data.uid}`, data, this.headers);
  }
}
