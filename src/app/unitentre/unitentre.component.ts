import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { FonctionsService } from '../fonctions.service';
import { Chart, ChartItem } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unitentre',
  templateUrl: './unitentre.component.html',
  styleUrls: ['./unitentre.component.scss']
})
export class UnitentreComponent implements OnInit {
  covarianceMatrix?: number[][];
  table:any
  vp:any
  nbrunite:any
  nbruicache:any
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
  constructor(private router:Router,private service:CommunicationService,private fonction:FonctionsService, private renderer:Renderer2,private elementRef: ElementRef){}
  ngOnInit(): void {
   
       this.declencheur()
       this.router.navigate(['route/archi/uniteentre/unitecache'])
       this.router.navigate(['route/archi/uniteentre/unitecache/apprentissage'])
       this.router.navigate(['route/archi/uniteentre/unitecache/apprentissage/unpas'])
       this.router.navigate(['route/archi/uniteentre/unitecache/apprentissage/unpas/plusieurs'])
  }
  declencheur(){
    localStorage.setItem('entre','true')
    localStorage.setItem('cache','true')
    this.service.changemenue(true)
    let datax=this.fonction.valuexy(0,0,500)[0]
    this.service.changeserie(datax)
    this.nbrunite=this.nbrEntre(9,1,datax)
    this.service.changenbrunitentre(this.nbrunite)
    localStorage.setItem('unitentre',JSON.stringify(this.nbrunite))
  }

  nbrEntre(m:number,t:number,datax:any){
    
    const lengthX=datax.length-m*t
    let valueX=[]
    for (let i = 1; i < lengthX; i++) {
      let x=[0]
      for (let j = 0; j < m; j++) {
        x[j]=datax[i+j*t]
       
        
      }
      valueX[i]=x
      
    }
    
    this.covarianceMatrix=this.fonction.covMatrix(valueX,1)
    this.vp=this.fonction.calculateValeurpropre(this.covarianceMatrix)
    let nbrunite=this.calculenbrunit(this.vp)
    
    return  nbrunite
    
  }
  calculenbrunit(data:any){
    
    let dat=this.fonction.trietableau(data)
    let datax=[]
    let datay=[]
    const epsilone= 0.008
    let nbrunite=-1
    for (let i = 0; i < dat.length; i++) {
      datax[i]=i
      datay[i]= Math.sqrt(dat[i]+1);
      if (nbrunite==-1 && i!=0) {
        
        if ((datay[i-1]-datay[i])<epsilone) {
          
          nbrunite=datax[i-1]
        }
      }
      
    }
    this.createChart(datax,datay)
    this.createnbrunite(nbrunite,"d'Entrée")
    return nbrunite
  }
  createChart(datax:any,datay:any) {
      const col=document.createElement('div');
      this.renderer.addClass(col, 'col');
      const datacanvas=document.querySelector('canvas')
      if (datacanvas) {
        this.renderer.removeChild(datacanvas.parentElement,datacanvas)
      }
    
      

      const canvas = document.createElement('canvas');
      const response = document.querySelector('#container_graphe')?.querySelector('.row');
      col.appendChild(canvas);
      response?.appendChild(col);
    
    
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
    let div0 =document.getElementById('nbrunitentre')
    if (div0) {
      this.renderer.removeChild(div0.parentElement,div0)
    }
      const response = document.querySelector('#container_graphe')?.querySelector('.row');
      const div=document.createElement('div');
      this.renderer.addClass(div, 'col');
      div.id='nbrunitentre'
      div.innerHTML='=> Le nombre d"unité '+event+' du réseau est '+ nbrunite
      div.style.fontSize='20px'
      div.style.color='rgb(11, 1, 54)'
      div.style.textAlign='start'
      

      response?.appendChild(div);
   }
   affichecache(id:any){
    
    const componentBElement = document.getElementById(id);
    if (componentBElement) {
      componentBElement.scrollIntoView({ behavior: 'smooth' });
      
    }
   
   }
}
