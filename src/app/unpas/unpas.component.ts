import { Component, OnInit } from '@angular/core';
import { FonctionsService } from '../fonctions.service';
import { Chart, ChartItem } from 'chart.js';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-unpas',
  templateUrl: './unpas.component.html',
  styleUrls: ['./unpas.component.scss']
})
export class UnpasComponent implements OnInit {
 nbrunite:any=localStorage.getItem('unitentre')
  constructor(private fonction:FonctionsService,private service:CommunicationService){}
  ngOnInit(): void {
    this.unpas()
  }
 afficheplusieurpas(id:any){
  const componentBElement = document.getElementById(id);
  if (componentBElement) {
    componentBElement.scrollIntoView({ behavior: 'smooth' });
    
  }
 }
 unpas(){
  localStorage.setItem('plusieurpas','true')
  this.service.changemenue(true)
  let val=10
  let serie=this.fonction.valuexy(0,0,500)[0]
  this.nbrunite=JSON.parse(this.nbrunite)
  let allprototype= this.fonction.allprototype(this.nbrunite,serie)
  let valuepas=[]
  let valattedue=[]
  for (let i = 0; i < val; i++) {
    valattedue[i] = serie[i+1+this.nbrunite]
    valuepas[i] = this.fonction.pas_avant(1,allprototype[i],localStorage.getItem('reseaux'),localStorage.getItem('poid'))[0]
  }
  
   this.createChart(valattedue,valuepas)
   
 }
 createChart(datax:any,datay:any) {

  const canvas = document.createElement('canvas');
  const response = document.querySelector('#container_graphe_unpas')?.querySelector('.row');
  response?.appendChild(canvas);
  
  
  const ctx = canvas.getContext('2d');
  if (ctx) {
    new Chart(ctx as ChartItem, {
      type: 'line',
      data: {
        labels: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9] ,
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
