import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  constructor(private route:Router){

  }
   ngOnInit(): void {
      
   }
   clickroute(data:any){
     this.route.navigate([data])
   }
}
