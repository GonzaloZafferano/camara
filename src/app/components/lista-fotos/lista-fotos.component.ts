import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonicModule } from '@ionic/angular';
import { Foto } from 'src/app/models/Foto';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-lista-fotos',
  templateUrl: './lista-fotos.component.html',
  styleUrls: ['./lista-fotos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]

})
export class ListaFotosComponent implements OnInit {
  @Input() tipoFotos: number = -1;
  @Input() idUsuarioActual: string = '';
  @ViewChild('contenido', { static: true }) contenido: IonContent | undefined;
suscripcion : any;

  constructor(private router: Router, private firestore: FirestoreService, private loginService: LoginService) { }

  fotos: any[] = [];
  ngOnInit() {
    this.cargarFotos();
  }

  volver() {
    if (this.tipoFotos == 0)
      this.router.navigate(['cosasLindas']);
    else if (this.tipoFotos == 1)
      this.router.navigate(['cosasFeas']);
  }

  get UsuarioActualId() {
    return this.loginService.usuarioActual != null ? this.loginService.usuarioActual.uid : '-1';
  }

  cargarFotos() {

    if(this.suscripcion)
    this.suscripcion.unsubscribe();
    // let x = this.UsuarioActualId;

    //  debugger;
    this.suscripcion = this.firestore.obtenerFotosPorTipoObservable(this.tipoFotos).subscribe(x => {

      this.fotos = x;
debugger;
    //  let algo = this.fotos[0].votosIds.includes(this.UsuarioActualId);
      // debugger;
      setTimeout(() => {
        this.contenido?.scrollToBottom(500);
      }, 1000);
    });
  }

  guardar(foto: Foto) {
    foto.votosIds.push(this.UsuarioActualId);
    this.firestore.actualizar(foto);
  }

  eliminar(foto: Foto) {
    let index = foto.votosIds.indexOf(this.UsuarioActualId);
    if (index != -1) {
      foto.votosIds.splice(index, 1);
      this.firestore.actualizar(foto);
    }
  }

  eliminar2(foto: Foto){
    foto.votosIds = foto.votosIds.filter(item => item !== this.UsuarioActualId);
    this.firestore.actualizar(foto);
  }
}
