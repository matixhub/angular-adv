import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{
  @Input('valor') progreso: number = 40;
  @Input() btnClass: string = 'btn-primary';
  
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  
  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  cambiarValor(valor: number){
    this.progreso = this.progreso + valor;
    this.valorSalida.emit( this.progreso );
  }

  onChange( valor:number ){
    this.valorSalida.emit( valor );
  }
}
