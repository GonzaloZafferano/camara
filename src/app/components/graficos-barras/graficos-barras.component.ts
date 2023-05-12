import Chart, { Colors } from 'chart.js/auto';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx'; 

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
  constructor(private screenOrientation: ScreenOrientation, public loadingController: LoadingController,private firestore: FirestoreService, private auth: AngularFireAuth, private router: Router) {

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE); //BLOQUEO VERTICAL

   }




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


      //  let algo = this.fotos[0].votosIds.includes(this.UsuarioActualId);
      // debugger;
   // let labelVotos = votos.length + " votos totales.";
    let labelVotos = sum + " votos totales.";

      const pieChart = new Chart(this.pieCanvas.nativeElement, {
        
        type: 'bar',
        options: {
          responsive: true,
          maintainAspectRatio: false, // Permite ajustar el tamaño sin mantener el aspecto original
          // Otros ajustes y opciones del gráfico
          // backgroundColor(ctx, options) {
          //   return '#FFFFFF'
          // }, 
          plugins: {  
                            
            legend: {
              labels: {
                
                font: {             
             
                 // size: fotos.length > 18 ? 10 : 12, // Ajusta el tamaño de fuente de las etiquetas del gráfico
                },
                padding : 3,
              //  textAlign : 'left', 
                color : '#000000'         
              
              },
             // align :'start'
            },
            // Cambia el color de las etiquetas
            
          },
          scales: {
            
            y: {  // not 'yAxes: [{' anymore (not an array anymore)
              ticks: {
                color: "#000000", // not 'fontColor:' anymore
                // fontSize: 18,
                font: {
                  size: 18, // 'size' now within object 'font {}'
                },
                stepSize: 1,
               // beginAtZero: true
              }
            },
            x: {  // not 'xAxes: [{' anymore (not an array anymore)
              ticks: {
                color: "#000000",  // not 'fontColor:' anymore
                //fontSize: 14,
                font: {
                  size: 12 // 'size' now within object 'font {}'
                },
                stepSize: 1,
               // beginAtZero: true
              }
            }
          }
        },
        
        data: {
          labels: fotos, //['Manzana', 'Banana', 'Naranja'],
          datasets: [{
            label: labelVotos,
            data: votos,            
          backgroundColor : '#C04A42'
            // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            //hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        
        },
        
      });












    });



  }


  volver() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT); //BLOQUEO VERTICAL
      this.router.navigate(['cosasFeas']);
  }

}
