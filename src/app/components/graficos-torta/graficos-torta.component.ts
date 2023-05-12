import Chart from 'chart.js/auto';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-graficos-torta',
  templateUrl: './graficos-torta.component.html',
  styleUrls: ['./graficos-torta.component.scss'],
  standalone: true,
  imports: [IonicModule,
    CommonModule,
    FormsModule]
})
export class GraficosTortaComponent {

  constructor(private firestore: FirestoreService, private auth: AngularFireAuth, private router: Router) { }

  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef;
suscripcion : any;

  ngAfterViewInit() {

    if(this.suscripcion)
    this.suscripcion.unsubscribe();
    // let x = this.UsuarioActualId;
let fotos;
let votos;
    //  debugger;
    this.suscripcion = this.firestore.obtenerFotosPorTipoObservable(0).subscribe(x => {

debugger;
      let algo = ['Manzana', 'Banana', 'Naranja'];
      let nose =  [30, 20, 50];
      
      fotos = x.map(x => x['nombreFoto']);
      votos = x.map(x => x['votosIds'].length);
debugger;
    //  let algo = this.fotos[0].votosIds.includes(this.UsuarioActualId);
      // debugger;
      setTimeout(() => {
        //this.contenido?.scrollToBottom(500);
      }, 1000);



 

      const pieChart = new Chart(this.pieCanvas.nativeElement, {
        type: 'pie',
        data: {
          labels: fotos, //['Manzana', 'Banana', 'Naranja'],
          datasets: [{
            data: votos,
           // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            //hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        }
      });












    });  
  }

  volver() {

      this.router.navigate(['cosasLindas']);

  }
}
