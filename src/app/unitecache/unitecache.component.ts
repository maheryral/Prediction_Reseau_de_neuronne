import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { FonctionsService } from '../fonctions.service';
import { Chart, ChartItem } from 'chart.js';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unitecache',
  templateUrl: './unitecache.component.html',
  styleUrls: ['./unitecache.component.scss']
})
export class UnitecacheComponent implements OnInit {
  covarianceMatrix?: number[][];
  table:any
  vp:any
  nbrunite:any= localStorage.getItem('unitentre')
  nbruicache:any=localStorage.getItem('unitecache')
  toutprototype:any
  poid?:number[][]
  datax?:number[]=[]
  datay?:number[]=[]
  entre:boolean=true
  cache:boolean=false
  conclusion:boolean=false
  matrix: number[][] = [
    [10, 20,30],
    [40, 50,60],
    [70,80,90]
  ];

  constructor(private router:Router, private service:CommunicationService,private fonction:FonctionsService, private renderer:Renderer2,private elementRef: ElementRef){}
  ngOnInit(): void {
      this.declencheur()
  }
  declencheur(){
   
    
    localStorage.setItem('apprentissage','true')
    this.service.changemenue(true)

    this.nbrunite=parseInt(this.nbrunite)
    let cache=this.nbrunitecaché()
    localStorage.setItem('unitecache',JSON.stringify(cache))
  }
  nbrunitecaché(){
    let allmnse=[]
    let datax=[]
    for (let i = 0; i < this.nbrunite-1; i++) {
      let dat=this.fonction.valuexy(0,0,500)[0]
      localStorage.setItem('serie',JSON.stringify(dat))
      let poids=[this.fonction.poidsinitialisation(this.nbrunite,i+1),this.fonction.poidsinitialisation(i+1,1)]
      localStorage.setItem('poid',JSON.stringify(poids))
      allmnse[i]=this.fonction.calculenmse(i+1,1,this.nbrunite)
      datax[i]=i+1
      
    }
    let minmnse= Math.min(...allmnse);
    this.createChart(datax,allmnse)
    this.createnbrunite( allmnse.indexOf(minmnse)+1,'Cachée')
    // let h=this.h(reseau,prototype,poids)
    // let deltapourprecede=this.deltacoucheprecedent(reseau,prototype,h,v,poids)
    // let deltapoid=this.deltapoid(v,deltapourprecede,0.1,reseau)
    // let newpoid=this.newpoid(poids,deltapoid,reseau)
    // return v
   
    return allmnse.indexOf(minmnse)+1;
  
  }
  createChart(datax:any,datay:any) {
    

    

    const canvas = document.createElement('canvas');
    const response = document.querySelector('#container_graphe_cache')?.querySelector('.row');
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
  createnbrunite(nbrunite:number,event:any){
    let div0 =document.getElementById('nbrunitecache')
    if (div0) {
      this.renderer.removeChild(div0.parentElement,div0)
    }
      const response = document.querySelector('#container_graphe_cache')?.querySelector('.row');
      const div=document.createElement('div');
      div.id='nbrunitecache'
      div.innerHTML='=> Le nombre d"unité '+event+' du réseau est '+ nbrunite
      div.style.fontSize='20px'
      div.style.color='rgb(11, 1, 54)'
      div.style.textAlign='start'
      response?.appendChild(div);
   }
   afficheapprentissage(id:any){
    
    const componentBElement = document.getElementById(id);
    if (componentBElement) {
      componentBElement.scrollIntoView({ behavior: 'smooth' });
      
    }
   }
}
