import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public medicoSeleccionado: Medico;
  public hospitales: Hospital[] = []
  public hospitalSeleccionado: Hospital;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService, private medicoService: MedicoService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ id }) => this.obtenerMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe(hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
    })
  }

  gurdarMedico() {

    const { nombre } = this.medicoForm.value;

    if(this.medicoSeleccionado){
      //desestructurar objeto
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data).subscribe( (resp: any) => {
        Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
      });

    }else{

      this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
      })

    }
  }

  obtenerMedico(id: string) {

    if(id === 'nuevo')
      return;

    this.medicoService.obtenerMedicoPorId(id)
      .pipe(
        delay(100)
      ).subscribe(resp => {
      if(!resp)
        return  this.router.navigateByUrl(`/dashboard/medicos`);

      const {nombre, hospital:{ _id }} = resp;
      this.medicoSeleccionado = resp;
      this.medicoForm.setValue({ nombre, hospital: _id});
    });

  }

  cargarHospitales() {
    this.hospitalService.obtenerHospitales().subscribe(hospitales => {
      this.hospitales = hospitales;
    });
  }

}
