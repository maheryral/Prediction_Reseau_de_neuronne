import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { FonctionsService } from '../fonctions.service';
import { Chart, ChartItem } from 'chart.js';

@Component({
  selector: 'app-apprentissage',
  templateUrl: './apprentissage.component.html',
  styleUrls: ['./apprentissage.component.scss']
})
export class ApprentissageComponent implements OnInit{
  nbrunitentre:any
  nbrunitecache:any
  constructor(private service:CommunicationService,private fonction:FonctionsService, private renderer:Renderer2){}


  ngOnInit(): void {
    this.initialisation()
     this.apprentissage()
  }
  initialisation(){
    // this.service.nbrunitentre$.subscribe(data=>{
    //   this.nbrunitentre=data
    // })

    // this.service.nbrunitecache$.subscribe(data=>{
    //   this.nbrunitecache=data
    // })
    this.nbrunitecache=2
    this.nbrunitentre=5
    let poids=[this.fonction.poidsinitialisation(this.nbrunitentre,this.nbrunitecache),this.fonction.poidsinitialisation(this.nbrunitecache,1)]
    this.service.changepoid(poids)

    let datax=this.fonction.valuexy(0,0,500)[0]
    this.service.changeserie(datax)
  }
  
  apprentissage(){
    let epoque=100
    let allmnse=[]
    let datax=[]

    for (let i = 0; i < epoque; i++) {
      
      allmnse[i]=this.fonction.calculenmse(this.nbrunitecache,1,this.nbrunitentre)
      
      datax[i]=i+1
      
    }
     
    return  this.createChart(datax,allmnse)
    
  }
  createChart(datax:any,datay:any) {
    
    const datacanvas=document.querySelector('canvas')
    if (datacanvas) {
      this.renderer.removeChild(datacanvas.parentElement,datacanvas)
    }
  
    

    const canvas = document.createElement('canvas');
    const response = document.querySelector('#response');
    response?.appendChild(canvas);
    
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      new Chart(ctx as ChartItem, {
        type: 'line',
        data: {
          labels: datax,
          datasets: [{
            label: 'Eₗ='+'\\( \\sqrt{x} \\)',
            data: datay,
            backgroundColor: 'rgb(16,217,219)',
            pointBorderColor: 'transparent',
            borderColor: '#3e95cd',
            
            
          }]
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
      });
    }
  }

 
 
}
