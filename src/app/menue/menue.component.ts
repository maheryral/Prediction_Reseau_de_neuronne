import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.scss']
})
export class MenueComponent implements OnInit{

  title:any
  description:any
  constructor(private route:Router){}
  ngOnInit() {
    this.title = 'HELP DESK';
    this.description='BIENVENUE DANS HELPDESK'
  }
  routenavigate(data:any){
    this.route.navigate([data])
  }
}
