import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica 1' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },

  //Mantenimiento
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuario de aplicacion' } },
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospital de aplicacion' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medico de aplicacion' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medico de aplicacion' } }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
