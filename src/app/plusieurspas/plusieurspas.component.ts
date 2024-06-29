import { Component, OnInit, Renderer2 } from '@angular/core';
import { FonctionsService } from '../fonctions.service';
import { Chart, ChartItem } from 'chart.js';

@Component({
  selector: 'app-plusieurspas',
  templateUrl: './plusieurspas.component.html',
  styleUrls: ['./plusieurspas.component.scss']
})
export class PlusieurspasComponent implements OnInit {
  nbrunite:any=localStorage.getItem('unitentre')
  troisvue:boolean=true
  dixvue:boolean=false
  vingvue:boolean=false
  constructor(private fonction:FonctionsService,private renderer:Renderer2){}
  
  ngOnInit(): void {
     
      this.plusieurpas(3)
  }
  plusieurpas(iteration:number){
    if (iteration==3) {
      this.troisvue=true
      this.vingvue=false
      this.dixvue=false
    }else if(iteration==10){
      this.troisvue=false
      this.vingvue=false
      this.dixvue=true
    }else{
      this.troisvue=false
      this.vingvue=true
      this.dixvue=false
    }
    let val=1
    let serie=this.fonction.valuexy(0,0,500)[0]
    this.nbrunite=JSON.parse(this.nbrunite)
    let allprototype= this.fonction.allprototype(this.nbrunite,serie)
    let valuepas=[]
    let valattedue=[]
    
    for (let i = 0; i < val; i++) {
      for (let k = 0; k < iteration; k++) {
        valattedue[k] = serie[i+k+1+this.nbrunite]
        
      }
     
      
      valuepas[i] = this.fonction.pas_avant(iteration,allprototype[i],localStorage.getItem('reseaux'),localStorage.getItem('poid'))
    }
     this.createChart(valattedue,valuepas[0])
     
   }
   createChart(datax:any,datay:any) {
    const graphe=document.getElementById('graphe_plusieur')
    if (graphe) {
      this.renderer.removeChild(graphe.parentElement,graphe)
    }

    const canvas = document.createElement('canvas');
    canvas.id='graphe_plusieur'
    const response = document.querySelector('#container_graphe_plusieurpas')?.querySelector('.row');
    response?.appendChild(canvas);
    
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      new Chart(ctx as ChartItem, {
        type: 'line',
        data: {
          labels: datax ,
          datasets: [
            {
            label: 'valeur donneé par le réseaux',
            data: datay,
            backgroundColor: 'rgb(16,217,219)',
            pointBorderColor: 'transparent',
            borderColor: '#3e95cd',
            },
            {
              label: 'valeur à prédire ',
              data: datax,
              backgroundColor: 'black',
              pointBorderColor: 'transparent',
              borderColor: 'black',
            }
          
        ]
        },
        
        options: {
          // plugins: {
          //   legend: {
          //     display: false
          //   }
          // },
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'l'
              },
              grid: {
                color: 'rgba(220, 220, 220, 0.05)' 
              }
            },
            y: {
              title: {
                display: true,
                text: 'E'
              },
              
              grid: {
                color: 'rgba(220, 220, 220, 0.05)' 
              }
            }
          }
        }
      },
      
    
    );
    }
  }
}
