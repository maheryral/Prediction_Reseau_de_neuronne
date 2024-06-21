import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { MenueComponent } from './menue/menue.component';
import { AppComponent } from './app.component';
import { RouteComponent } from './route/route.component';
import { XnYnComponent } from './xn-yn/xn-yn.component';
import { GrapheComponent } from './graphe/graphe.component';
import { ArchiOptimalComponent } from './archi-optimal/archi-optimal.component';

const routes: Routes = [
  { path: 'route', component: RouteComponent,
    children:[
      { path: 'acceuil', component:AcceuilComponent },
      { path: 'xn_yn', component:XnYnComponent },
      { path: 'graphe', component:GrapheComponent },
      { path: 'archi', component:ArchiOptimalComponent },
      
     
     
    ]
  },
  { path: '', redirectTo: 'route/acceuil', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
