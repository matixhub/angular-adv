import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService, public fileService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
   this.modalImagenService.cerrarModal();
   this.imgTemp = null;
  }

  cambiarImagen(file: File) {
    console.log(file);

    if (file) {
      this.imagenSubir = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    }
    else
      return this.imgTemp = null;

  }

  subirImagen() {

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileService.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch( (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      })
  }

}
