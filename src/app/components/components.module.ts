import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';

//Cuando se crea primero un modulo personalizado los componentes de la misma carpeta van a el

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
