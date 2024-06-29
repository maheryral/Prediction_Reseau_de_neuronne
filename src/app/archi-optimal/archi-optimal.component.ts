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
  
   constructor(private service:CommunicationService,private fonction:FonctionsService, private renderer:Renderer2,private elementRef: ElementRef){}
   ngOnInit(): void {
    // this.createnbrunite(this.nbrEntre(9,1,this.service.valuexy(0,0,500)[0]))
    // let pro=[1,0,1]
    // let x=this.nbrunitecaché(pro,2,1)
    // alert(x)
    // this.declencheur('entre')
    // this.calculenewpoid()
    localStorage.setItem('unitentre','')
    localStorage.setItem('unitecache','')
   
   }
  //  declencheur(event:any){
    
    
  //   if (event=='cache') {
  //     this.entre=false
  //     this.conclusion=false
  //     this.cache=true
  //     this.nbruicache= this.nbrunitecaché()
  //     this.service.changenbrunitecache(this.nbruicache)
  //   }else if (event=='conclusion') {
  //     this.entre=false
  //     this.conclusion=true
  //     this.cache=false
  //   }else{
  //     this.entre=true
  //     this.conclusion=false
  //     this.cache=false
  //   }
    
   
  //   // let datax=this.service.valuexy(0,0,500)[0]
  //   // this.nbrunite=this.nbrEntre(9,1,datax)
  //  }
  



  // createlement(valuex:any){
  //   this.table=document.getElementById('tbody')?.querySelector('table')
    
  //   const tr = this.renderer.createElement('tr');
  //   this.renderer.appendChild(this.table, tr);
  //   for (let i = 1; i < valuex.length; i++) {
  //     const td = this.renderer.createElement('td');
      
       
  //     for (let j = 0; j < valuex[i].length; j++) {
  //        td.innerHTML=td.innerHTML + valuex[i][j].toString() +'<br>' 
  //     }
  //     this.renderer.appendChild(tr, td);
  //   }
  // }
  
  

 
  
 
}
