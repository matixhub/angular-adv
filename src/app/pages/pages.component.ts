import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

declare function customInit();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private sideBarService: SidebarService) { }

  ngOnInit(): void {
    customInit(); //Inicializar plugins JQUERY
    this.sideBarService.cargarMenu();
  }

}
