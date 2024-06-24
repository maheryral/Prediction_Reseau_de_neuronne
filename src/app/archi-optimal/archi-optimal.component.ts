import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommunicationService } from '../communication.service';
import * as math from 'mathjs';
import { Chart,ChartItem } from 'chart.js/auto';
import { AppModule } from '../app.module';
import { FonctionsService } from '../fonctions.service';

@Component({
  selector: 'app-archi-optimal',
  templateUrl: './archi-optimal.component.html',
  styleUrls: ['./archi-optimal.component.scss']
})
export class ArchiOptimalComponent implements OnInit {
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
   constructor(private service:CommunicationService,private fonction:FonctionsService, private renderer:Renderer2,private elementRef: ElementRef){}
   ngOnInit(): void {
    // this.createnbrunite(this.nbrEntre(9,1,this.service.valuexy(0,0,500)[0]))
    // let pro=[1,0,1]
    // let x=this.nbrunitecaché(pro,2,1)
    // alert(x)
    this.declencheur('entre')
    // this.calculenewpoid()
    
   
   }
   declencheur(event:any){
    
    let datax=this.fonction.valuexy(0,0,500)[0]
    this.service.changeserie(datax)
    this.nbrunite=this.nbrEntre(9,1,datax)
    this.service.changenbrunitentre(this.nbrunite)
    if (event=='cache') {
      this.entre=false
      this.conclusion=false
      this.cache=true
      this.nbruicache= this.nbrunitecaché()
      this.service.changenbrunitecache(this.nbruicache)
    }else if (event=='conclusion') {
      this.entre=false
      this.conclusion=true
      this.cache=false
    }else{
      this.entre=true
      this.conclusion=false
      this.cache=false
    }
    
   
    // let datax=this.service.valuexy(0,0,500)[0]
    // this.nbrunite=this.nbrEntre(9,1,datax)
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



  createlement(valuex:any){
    this.table=document.getElementById('tbody')?.querySelector('table')
    
    const tr = this.renderer.createElement('tr');
    this.renderer.appendChild(this.table, tr);
    for (let i = 1; i < valuex.length; i++) {
      const td = this.renderer.createElement('td');
      
       
      for (let j = 0; j < valuex[i].length; j++) {
         td.innerHTML=td.innerHTML + valuex[i][j].toString() +'<br>' 
      }
      this.renderer.appendChild(tr, td);
    }
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

 createnbrunite(nbrunite:number,event:any){
  let div0 =document.getElementById('nbrunite')
  if (div0) {
    this.renderer.removeChild(div0.parentElement,div0)
  }
    const response = document.querySelector('#response');
    const div=document.createElement('div');
    div.id='nbrunite'
    div.innerHTML='Le nombre d"unité '+event+' du réseau est '+ nbrunite
    div.style.fontSize='30px'
    div.style.color='rgb(11, 1, 54)'
     div.style.fontWeight='bold'
    response?.appendChild(div);
 }
  nbrunitecaché(){
    let allmnse=[]
    let datax=[]
    for (let i = 0; i < this.nbrunite-1; i++) {
      this.service.changeserie(this.fonction.valuexy(0,0,500)[0])
      let poids=[this.fonction.poidsinitialisation(this.nbrunite,i+1),this.fonction.poidsinitialisation(i+1,1)]
      this.service.changepoid(poids)
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
 
}
