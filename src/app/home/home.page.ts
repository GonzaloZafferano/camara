import { Component } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../components/login/login.component';
import { Output, EventEmitter } from '@angular/core';
import { RegistroComponent } from '../components/registro/registro.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { BienvenidoComponent } from '../components/bienvenido/bienvenido.component';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FotoService } from '../services/foto.service';
import { FireStorageService } from '../services/fire-storage.service';
import { Firestore } from '@angular/fire/firestore';
import { Foto } from '../models/Foto';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,
    CommonModule,
    FormsModule,
    LoginComponent,
    RegistroComponent,
    BienvenidoComponent], //Array de MODULOS Y 'COMPONENTES QUE SEAN STANDALONE:true'
})
export class HomePage {

  suscripcion: any;
  ruta: string = '';
  constructor(private auth: AngularFireAuth, private firestore: FirestoreService, private fireStorage: FireStorageService, private loginService: LoginService,
     private router: Router, public loadingController: LoadingController, private foto: FotoService) {

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



  async sacarFotoLinda() {
    await this.sacarFoto(1);
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

  leerFoto() {
   // let z = this.fireStorage.obtenerFoto('https://firebasestorage.googleapis.com/v0/b/p-p-s-2d400.appspot.com/o/gonzalo%40prueba.com_10-05-2023_21-4-515?alt=media&token=f96cd745-774c-4b64-a41a-8202bd271eed');

   // this.ruta = 'https://firebasestorage.googleapis.com/v0/b/p-p-s-2d400.appspot.com/o/gonzalo%40prueba.com_10-05-2023_21-4-515?alt=media&token=f96cd745-774c-4b64-a41a-8202bd271eed';
   // debugger;
    //this.ruta = z;
  }

  cosasLindas() {
    this.router.navigate(['cosasLindas']);
  }

  cosasFeas() {
    this.router.navigate(['cosasFeas']);
  }
}
