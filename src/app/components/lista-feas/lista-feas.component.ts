import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListaFotosComponent } from '../lista-fotos/lista-fotos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-feas',
  templateUrl: './lista-feas.component.html',
  styleUrls: ['./lista-feas.component.scss'],
  standalone : true,
  imports: [CommonModule, ListaFotosComponent, IonicModule]

})
export class ListaFeasComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

}
