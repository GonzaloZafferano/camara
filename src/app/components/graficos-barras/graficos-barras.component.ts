import Chart from 'chart.js/auto';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-graficos-barras',
  templateUrl: './graficos-barras.component.html',
  styleUrls: ['./graficos-barras.component.scss'],
  standalone: true,
  imports: [IonicModule,
    CommonModule,
    FormsModule]
})
export class GraficosBarrasComponent {
  constructor(private firestore: FirestoreService, private auth: AngularFireAuth, private router: Router) { }

  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef;
  suscripcion: any;

  ngAfterViewInit() {

    if (this.suscripcion)
      this.suscripcion.unsubscribe();
    // let x = this.UsuarioActualId;
    let fotos;
    let votos;
    //  debugger;
    this.suscripcion = this.firestore.obtenerFotosPorTipoObservable(1).subscribe(x => {


      fotos = x.map(x => x['nombreFoto']);
      votos = x.map(x => x['votosIds'].length);
    
      let accumulator = 0;
      let currentValue = 0;
      const sum = votos.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      debugger;

      //  let algo = this.fotos[0].votosIds.includes(this.UsuarioActualId);
      // debugger;
   // let labelVotos = votos.length + " votos totales.";
    let labelVotos = sum + " votos totales.";

      const pieChart = new Chart(this.pieCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: fotos, //['Manzana', 'Banana', 'Naranja'],
          datasets: [{
            label: labelVotos,
            data: votos,
            // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            //hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        }
      });












    });



  }


  volver() {

      this.router.navigate(['cosasFeas']);
  }

}
