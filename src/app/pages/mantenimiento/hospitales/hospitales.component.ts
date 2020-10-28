import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  public imgSub: Subscription;

  constructor(private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe(); //evitar fugas de memoria
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSub = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => this.cargarHospitales());
  }

  buscar(termino: string) {

    if (termino.length === 0)
      return this.cargarHospitales();

    this.busquedaService.buscar('hospitales', termino).subscribe(resp => {
      this.hospitales = resp;

    });
  }

  cargarHospitales() {

    this.cargando = true;
    this.hospitalService.obtenerHospitales().subscribe(hospitales => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe(resp => {
      Swal.fire('Actualizado', hospital.nombre, "success");
    })
  }

  borrarCambios(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id).subscribe(resp => {
      this.cargarHospitales();
      Swal.fire('Eliminado', hospital.nombre, "success");
    })
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Ingrese nombre del hospital',
      showCancelButton: true,
    })

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
      })
    }

  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }
}
