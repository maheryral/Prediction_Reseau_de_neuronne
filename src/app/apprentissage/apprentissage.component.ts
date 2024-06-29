import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { FonctionsService } from '../fonctions.service';
import { Chart, ChartItem } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apprentissage',
  templateUrl: './apprentissage.component.html',
  styleUrls: ['./apprentissage.component.scss']
})
export class ApprentissageComponent implements OnInit{
  nbrunitentre:any=localStorage.getItem('unitentre')
  nbrunitecache:any=localStorage.getItem('unitecache')
  constructor(private service:CommunicationService,private fonction:FonctionsService, private renderer:Renderer2,private route:Router,private elementRef: ElementRef){}


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
    this.nbrunitecache=parseInt(this.nbrunitecache)
    this.nbrunitentre=parseInt(this.nbrunitentre)
    let poids=[this.fonction.poidsinitialisation(this.nbrunitentre,this.nbrunitecache),this.fonction.poidsinitialisation(this.nbrunitecache,1)]
    localStorage.setItem('poid',JSON.stringify(poids))

    let datax=this.fonction.valuexy(0,0,500)[0]
    localStorage.setItem('serie',JSON.stringify(datax))
    let reseau=[this.nbrunitentre,this.nbrunitecache,1]
    localStorage.setItem('reseaux',JSON.stringify(reseau))
  }
  
  apprentissage(){
    localStorage.setItem('unpas','true')
    
    this.service.changemenue(true)

    let epoque=100
    let allmnse=[]
    let datax=[]
      let dat=this.fonction.valuexy(0,0,500)[0]
      localStorage.setItem('serie',JSON.stringify(dat))
      let poids=[this.fonction.poidsinitialisation(this.nbrunitentre,this.nbrunitecache),this.fonction.poidsinitialisation(this.nbrunitecache,1)]
      localStorage.setItem('poid',JSON.stringify(poids))
    for (let i = 0; i < epoque; i++) {
      
      allmnse[i]=this.fonction.calculenmse(this.nbrunitecache,1,this.nbrunitentre)
      
      datax[i]=i+1
      
     
    }
    let minmnse= Math.min(...allmnse);
    return  this.createChart(datax,allmnse)
    
  }
  createChart(datax:any,datay:any) {

    const canvas = document.createElement('canvas');
    const response = document.querySelector('#container_graphe_aprenti')?.querySelector('.graphe');
    response?.appendChild(canvas);
    
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      new Chart(ctx as ChartItem, {
        type: 'line',
        data: {
          labels: datax,
          datasets: [{
            label: '',
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

  afficheunpas(id:any){
    const componentBElement = document.getElementById(id);
    if (componentBElement) {
      componentBElement.scrollIntoView({ behavior: 'smooth' });
      
    }
   }
 
}
