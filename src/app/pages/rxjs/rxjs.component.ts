import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {
    let i = -1;
    
    //El proceso asincrono se sigue ejecutando porque esta en memoria aunque te cambies de comp.
    const obs$ = new Observable(observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i == 4) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000)
    });
    //Con esto el observable empieza a trabajar ya que alguien se suscribio
    obs$.subscribe(
      valor => console.log('Subs', valor),
      err => console.warn('Error:', err),
      () => console.info('Obs Termimado')
    );

  }

  ngOnInit(): void {
  }

}
