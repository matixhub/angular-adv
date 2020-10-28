import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy{

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSub: Subscription;

  constructor(private medicoService: MedicoService, private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe(); //evitar fugas de memoria
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSub = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.obtenerMedicos().subscribe(resp => {
      this.cargando = false;
      this.medicos = resp;
    })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string) {

    if (termino.length === 0)
      return this.cargarMedicos();

    this.busquedaService.buscar('medicos', termino).subscribe((resp: Medico[]) => {
      this.medicos = resp;

    });
  }

  borrarCambios(medico: Medico) {
    this.medicoService.borrarMedico(medico._id).subscribe(resp => {
      this.cargarMedicos();
      Swal.fire('Eliminado', medico.nombre, "success");
    })
  }


}
