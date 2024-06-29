import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  constructor(private route:Router,private service:CommunicationService){

  }
   ngOnInit(): void {
    localStorage.setItem('entre','false')
    localStorage.setItem('cache','false')
    localStorage.setItem('apprentissage','false')
    localStorage.setItem('unpas','false')
    localStorage.setItem('plusieurpas','false')
    this.service.changemenue(true)
   }
   clickroute(data:any){
     this.route.navigate([data])
   }
}
