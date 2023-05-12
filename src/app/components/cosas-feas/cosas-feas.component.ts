import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Foto } from 'src/app/models/Foto';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FotoService } from 'src/app/services/foto.service';
import { LoginService } from 'src/app/services/login.service';
import { IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.component.html',
  styleUrls: ['./cosas-feas.component.scss'],
  standalone : true,
  
  imports: [IonicModule,
    CommonModule,
    FormsModule]

})
export class CosasFeasComponent  implements OnInit {

  suscripcion: any;
  ruta: string = '';
  constructor(private auth: AngularFireAuth, private firestore: FirestoreService, 
    private fireStorage: FireStorageService, private loginService: LoginService, private router: Router, public loadingController: LoadingController, private foto: FotoService) {

  }
  ngOnInit(): void {
    

  }

  async logout() {
    const loading = await this.presentLoading();

    setTimeout(() => {
      this.loginService.desloguear();
      this.router.navigate(['/login']);
      loading.dismiss();
    }, 2000);

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión',
      spinner: 'lines',
      translucent: true,
      cssClass: 'custom-class'
    });

    await loading.present();
    return loading;
  }


  async sacarFotoFea() {
    await this.sacarFoto(1);
  }

  async sacarFoto(tipoFoto: number) {

    let idUsuario = '';
    let usuario = '';
    await this.auth.currentUser.then((x) => {
      idUsuario = x?.uid ? x.uid : '';
      usuario = x?.email ? x.email : '';
    });

    if (this.suscripcion)
      this.suscripcion.unsubscribe();

    this.foto.sacarFoto().then(x => {
      fetch(x).then((e) => {

        let fecha = new Date();

        e.blob().then((blob) => {
          let nombreFoto = `${usuario}_${this.obtenerFechaString(fecha)}`;
          const file = new File([blob], nombreFoto, {
            type: 'image/png',
          });
          this.suscripcion = this.fireStorage.cargarFoto(file, file.name)
            .subscribe((url) => {

              let foto = new Foto();
              foto.fecha = fecha;
              foto.ruta = url;
              foto.usuarioPropietarioId = idUsuario;
              foto.fotoCategoria = tipoFoto;
              foto.nombreFoto = nombreFoto;
              foto.usuario = usuario;

              this.firestore.guardar(foto);
            });
        });
      });
    });

  }


  obtenerFechaString(fecha: Date) {

    let dia = fecha.getDate() + 1;
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();

    let cadenaDia = dia < 10 ? '0' + dia.toString() : dia.toString();
    let cadenaMes = mes < 10 ? '0' + mes.toString() : mes.toString();

    return cadenaDia + '-' + cadenaMes + '-' + anio.toString() + '_' + hora + '-' + minutos + '-' + segundos;
  }


  verFotos(){
    this.router.navigate(['listaFeas']);
  }

  
  volver() {
    this.router.navigate(['home']);
}

verGraficos(){
  this.router.navigate(['grafico-barras']);
}
}
