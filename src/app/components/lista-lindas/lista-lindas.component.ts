import { Component, OnInit } from '@angular/core';
import { ListaFotosComponent } from '../lista-fotos/lista-fotos.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-lindas',
  templateUrl: './lista-lindas.component.html',
  styleUrls: ['./lista-lindas.component.scss'],
  standalone : true,
  imports: [CommonModule, ListaFotosComponent, IonicModule]

})
export class ListaLindasComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

}
