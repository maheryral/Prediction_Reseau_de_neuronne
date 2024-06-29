import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.scss']
})
export class MenueComponent implements OnInit{

  title:any
  description:any
  constructor(private route:Router,private service:CommunicationService,private renderer:Renderer2,private elementRef: ElementRef){}
  ngOnInit() {
    this.title = 'HELP DESK';
    this.description='BIENVENUE DANS HELPDESK'
   
    this.service.menue$.subscribe(data=>{
      this.createelement()
    })
  }
  routenavigate(data:any){
    this.route.navigate([data])
  }
  routemenue(id:any){
    const componentBElement = document.getElementById(id);
    if (componentBElement) {
      componentBElement.scrollIntoView({ behavior: 'smooth' });
      
    }
  }
  createelement(){
    let prediction=document.getElementById('prediction')
    let menu=[
      {id:'entre',route:'/route/archi/uniteentre',nom:'Unité Entrée',idid:'container_graphe'},
      {id:'cache',route:'/route/archi/uniteentre/unitecache',nom:' Unité Cachée',idid:'container_graphe_cache'},
      {id:'apprentissage',route:'/route/archi/uniteentre/unitecache/apprentissage',nom:'Apprentissage',idid:'container_graphe_aprenti'},
      {id:'unpas',route:'/route/archi/uniteentre/cache/apprentissage/unpas',nom:'un pas en avant',idid:'container_graphe_unpas'},
      {id:'plusieurpas',route:'/route/archi/uniteentre/cache/apprentissage/dixpas',nom:'plusieurs pas en avant',idid:'container_graphe_plusieurpas'},
     ]
     for (let i = 0; i < menu.length; i++) {
      let data=document.getElementById(menu[i].id)
      if (data) {
        this.renderer.removeChild(data.parentElement,data)
      }
     }
     for (let i = 0; i < menu.length; i++) {
      if (localStorage.getItem(menu[i].id)=='true') {
        let li= this.renderer.createElement('li');
        li.id=menu[i].id
        this.renderer.listen(li, 'click', () => this.routemenue(menu[i].idid));
        let a = this.renderer.createElement('a');
        a.innerText=menu[i].nom
        this.renderer.appendChild(li, a);
        this.renderer.appendChild(prediction, li);
     }
      
     }
  }
}
