import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommunicationService } from '../communication.service';
@Component({
  selector: 'app-xn-yn',
  templateUrl: './xn-yn.component.html',
  styleUrls: ['./xn-yn.component.scss']
})
export class XnYnComponent implements OnInit {
  tbody:any
  trbody:any
  table:any
  constructor(private renderer: Renderer2,private service:CommunicationService){

  }
  ngOnInit(): void {
      this.traitevariable('x')
  }
  createlement(text:any){
    this.tbody=document.getElementById('tbody')
    const col = this.renderer.createElement('div');
    this.renderer.addClass(col, 'col-3');
    col.innerText=text
    this.renderer.appendChild(this.tbody, col);
  }
  traitevariable(data:any){
     const dataxy=this.service.valuexy(0,0,500)
     let text=''
     this.trbody=document.getElementById('trbody')
     if (this.trbody) {
     
      this.renderer.removeChild(this.trbody.parentElement,this.trbody)
      this.createparent()
     }
     else{
    
      this.createparent()
      

     }
     if (data=='x') {
      for (let i = 1; i < dataxy[0].length; i++) {
       
        text='x'+i+' = '+dataxy[0][i]
        this.createlement(text)
       
       }
     }
     else{
      for (let i = 1; i < dataxy[1].length; i++) {
        
        text='y'+i+' = '+dataxy[1][i]
        this.createlement(text)
       
       }
     }
    
     
  }
  createparent(){
    this.table=document.querySelector('table')
    
    const tr = this.renderer.createElement('tr');
    tr.id='trbody'
    this.renderer.appendChild(this.table, tr);

    const td= this.renderer.createElement('td');
    td.setAttribute('colspan',2)
    this.renderer.appendChild(tr, td);
    
    const row= this.renderer.createElement('div');
    this.renderer.addClass(row, 'row');
    row.id='tbody'
    this.renderer.appendChild(td, row);
    
  }
}
