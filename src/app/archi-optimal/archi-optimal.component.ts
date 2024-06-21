import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommunicationService } from '../communication.service';
import * as math from 'mathjs';
import { Chart,ChartItem } from 'chart.js/auto';
import { AppModule } from '../app.module';

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
  toutprototype:any
  poid?:number[][]
  datax?:number[]=[]
  datay?:number[]=[]
  matrix: number[][] = [
    [10, 20,30],
    [40, 50,60],
    [70,80,90]
  ];
   constructor(private service:CommunicationService, private renderer:Renderer2,private elementRef: ElementRef){}
   ngOnInit(): void {
    // this.createnbrunite(this.nbrEntre(9,1,this.service.valuexy(0,0,500)[0]))
    // let pro=[1,0,1]
    // let x=this.nbrunitecaché(pro,2,1)
    // alert(x)
    this.declencheur()
    
   
   }
   declencheur(){
    let datax=this.service.valuexy(0,0,500)[0]
    this.nbrunite=this.nbrEntre(9,1,datax)
     alert(this.nbrunitecaché())
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
    
    this.covarianceMatrix=this.covMatrix(valueX,1)
    this.vp=this.calculateValeurpropre(this.covarianceMatrix)
    let nbrunite=this.calculenbrunit(this.vp)
    
    return  nbrunite
    
  }
  

 transposeMatrix ( matrix:number[][]):number[][]  {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};

 meanMatrix (matrix:number[][],k:number ):number[] {
  const mean = Array(matrix[k].length).fill(0);
  for (let i = k; i < matrix.length; i++) {
    for (let j = 0; j < matrix[k].length; j++) {
      mean[j] += matrix[i][j];
    }
  }
  return mean.map(m => m / matrix.length);
};

 variance (vector:number[], mean:number) {
  return vector.reduce((acc, val) => acc + (val - mean) ** 2, 0) / (vector.length - 1);
};

covariance = (vectorX:number[], meanX:number, vectorY:number[], meanY:number) => {
  return vectorX.reduce((acc, val, i) => acc + (val - meanX) * (vectorY[i] - meanY), 0) / (vectorX.length - 1);
};

covMatrix (matrix:number[][],k:number ):number[][] {
  const mean =this.meanMatrix(matrix,k);
  const n = matrix[k].length;
  const covMatrix = Array(n).fill(0).map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        covMatrix[i][j] = this.variance(matrix.map(row => row[i]), mean[i]);
      } else {
        covMatrix[i][j] = this.covariance(matrix.map(row => row[i]), mean[i], matrix.map(row => row[j]), mean[j]);
      }
    }
  }
  return covMatrix;
};


  calculateValeurpropre(matrice:any) {
    const eig = math.eigs(matrice);

    
      return eig.values;
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
    
    let dat=this.trietableau(data)
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
  trietableau(tab:any){
    tab.sort(function(a:number, b:number) {
      return b - a;
    });
    return tab
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
      allmnse[i]=this.calculenmse(i+1,1)
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
  calculenmse(nbrunitecache:number,nbrunitesortie:number){
    
    let serie = this.service.valuexy(0,0,500)[0]
    let varianceserie=this.calculateVariance(serie)
    const pas=0.1
    let valattendue=0
    let valdonneereseau=0
    let som=0
    let prototype=this.allprototype(this.nbrunite,serie)
    let reseau=[prototype[0].length,nbrunitecache,nbrunitesortie]
    let poids=[this.poidsinitialisation(prototype[0].length,nbrunitecache),this.poidsinitialisation(nbrunitecache,nbrunitesortie)]
    for (let i = 0; i < prototype.length; i++) {
      
      let h=this.h(reseau,prototype[i],poids)
      let v=this.vfunction(reseau,prototype[i],poids)
       let deltapourprecede=this.deltacoucheprecedent(reseau,prototype[i],h,v,poids)
       let deltapoid=this.deltapoid(v,deltapourprecede,0.1,reseau)
       poids=this.newpoid(poids,deltapoid,reseau)
      
      som=som+((serie[i+prototype[0].length]-v[reseau.length-1][0]) ** 2)
      
    }
    
      let nmse=(1/(prototype.length*varianceserie))*som

    return nmse
  }
  calculateVariance(matrix: number[][]): number {
    // Transformer la matrice en vecteur (tableau)
    const vector: number[] = matrix.flat();

    // Calculer la moyenne des éléments
    const mean: number = vector.reduce((acc, val) => acc + val, 0) / vector.length;

    // Calculer la variance
    const variance: number = vector.reduce((acc, val) => acc + (val - mean) ** 2, 0) / vector.length;

    return variance;
  }
  allprototype(nbrunite:any,data:any){
    
    let allprotoype:number[][]=[[]]
     let n=data.length
     let i=1
     let k=0
     let l=0
     while (l<n-2) {
      if (!allprotoype[k]) allprotoype[k] = [];
      for (let j = 0; j < nbrunite+1; j++) {
        allprotoype[k][j]=data[i+j]
        
      }
      l=i+nbrunite
      i=i+1
      k=k+1
     }
    
     return allprotoype 

  }
  vfunction(reseau:any,prototype: number[],poid:number[][][]){
   
    let mm=reseau.length
    let v:number[][]=[[]]
    v[0]=prototype
    let h=this.h(reseau,prototype,poid)
    
    for (let m = 1; m < mm; m++) {
      
      if (!v[m]) v[m] = [];
      for (let i = 0; i < reseau[m]; i++) {
       
        v[m][i]= this.g(h[m][i])
      }
     
     
    }
    
    return v 
    
  }
  h(reseau:any,prototype: number[],poid:number[][][]){
   
    let mm=reseau.length
    let v:number[][]=[[]]
    let h:number[][]=[[]]
    v[0]=prototype
    let x=0
    
    for (let m = 1; m < mm; m++) {
      
      if (!v[m]) v[m] = [];
      for (let i = 0; i < reseau[m]; i++) {
        x=0
        for (let j = 0; j < v[m-1].length; j++) {
          
          x=x+poid[m-1][i][j] * v[m-1][j]
          
          
        }
        v[m][i]= this.g(x)
        if (!h[m]) h[m] = [];
        h[m][i]=x
        
      }
    
     
    }
    
    return h
    
  }
  deltapourcouchesortie(reseau:any,prototype: number[],h:number[][],v:number[][]){
    let delta:number[][]=[[]]
     let m=reseau.length-1
      if (!delta[m]) delta[m] = [];
      for (let i = 0; i < reseau[reseau.length-1]; i++) {
        delta[m][i]=this.gprime(h[m][i])*(1-v[m][i])
      }
      
     
     
     return delta
  }
  deltacoucheprecedent(reseau:any,prototype: number[],h:number[][],v:number[][],poid:number[][][]){
    let delta:number[][]=[[]]
    let detltasortie=this.deltapourcouchesortie(reseau,prototype,h,v)
    let m=reseau.length-1
    let som=0
    
    for (let i = 0; i < reseau[m-1]; i++) {
      som=0
      if (!delta[m-1]) delta[m-1] = [];
      
      for (let j = 0; j < reseau[m]; j++) {
        
        
       som=som+poid[m-1][j][i]*detltasortie[m][j]
       
      }
      
      delta[m-1][i]=this.gprime(h[m-1][i]) * som
      
      
    }
    if (!delta[m]) delta[m] = [];
    
    for (let j = 0; j < reseau[reseau.length-1]; j++) {
      delta[m][j]=detltasortie[m][j]
      
    }
    
    return delta
  }
  g(x:any){
    return 1/(1+math.exp(-x))
  }
  gprime(x: any){
    return Math.exp(-x) / ((1 + Math.exp(-x)) ** 2);
  }
  
  deltapoid(v:number[][],delta:number[][],n:any,reseau:any){
    
    let deltapoid:number[][][]=[[[]]]
    let mm=reseau.length
   
    for (let m = 1; m < mm; m++) {
      if (!deltapoid[m]) deltapoid[m] = [];
      for (let i = 0; i < reseau[m]; i++) {
       
          // Initialiser une nouvelle ligne si elle n'existe pas
          for (let j = 0; j < reseau[m-1]; j++) {
             if (!deltapoid[m][j]) deltapoid[m][j] = [];
            //  alert('m= '+m+' i= '+i +' j= '+j )
             deltapoid[m][j][i] =n*delta[m][i]*v[m-1][j]
            //  alert('delta= '+delta[m][i])
            //  alert('v= '+v[m-1][j])
            //  alert(' delapoide= '+ deltapoid[m][j][i])
           
          }
        }
      
      
    }
    return deltapoid
   
  }
  newpoid(poid:number[][][],deltapoid:number[][][], reseau:any){
  
    let mm=reseau.length-1
    let newpoid:number[][][]=[[[]]]
    for (let m = 0; m < mm; m++) {
      if (!newpoid[m]) newpoid[m] = [];
      for (let i = 0; i < reseau[m+1]; i++) {
       for (let j = 0; j < reseau[m]; j++) {
        if (!newpoid[m][j]) newpoid[m][j] = [];
        // alert('m= '+m+' i= '+i +' j= '+j )
        //  alert('deltapoid= '+deltapoid[m+1][j][i])
        //  alert('poid= '+poid[m][i][j])
          newpoid[m][i][j]=poid[m][i][j]+deltapoid[m+1][j][i]
          //  alert('delta= '+delta[m][i])
          //  alert('v= '+v[m-1][j])
          //  alert(' newpoid= '+ newpoid[m][j][i])
        
       }
      }
      
    }
    return newpoid
  }
  poidsinitialisation(n1:any,n2:any){
    let poid :number[][] = [[]];
    for (let i = 0; i < n1; i++) {
      // Initialiser une nouvelle ligne si elle n'existe pas
      for (let j = 0; j < n2; j++) {
        if (!poid[j]) poid[j] = [];
        poid[j][i] = parseFloat((Math.random() * (0.3 - 0.1) + 0.1).toFixed(1));
      }
    }
  //  if (n1==3) {
  //   if (!poid[0]) poid[0] = [];
  //   poid[0][0]=0.2  
  //   if (!poid[1]) poid[1] = [];
  //  poid[1][0]=0.3
  //  if (!poid[0]) poid[0] = [];
  //  poid[0][1]=0.1
  //  if (!poid[1]) poid[1] = [];
  //  poid[1][1]=0.2
  //  if (!poid[0]) poid[0] = [];
  //  poid[0][2]=0.1
  //  if (!poid[1]) poid[1] = [];
  //  poid[1][2]=0.3
   
  //  }
  //  else{
  //   if (!poid[0]) poid[0] = [];
  //   poid[0][0]=0.2
  //   if (!poid[0]) poid[0] = [];
  //  poid[0][1]=0.3
  //  }
   
    
   
    return poid
  }
 
}
