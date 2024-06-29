import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { MenueComponent } from './menue/menue.component';
import { AppComponent } from './app.component';
import { RouteComponent } from './route/route.component';
import { XnYnComponent } from './xn-yn/xn-yn.component';
import { GrapheComponent } from './graphe/graphe.component';
import { ArchiOptimalComponent } from './archi-optimal/archi-optimal.component';
import { ApprentissageComponent } from './apprentissage/apprentissage.component';
import { UnitentreComponent } from './unitentre/unitentre.component';
import { UnitecacheComponent } from './unitecache/unitecache.component';
import { UnpasComponent } from './unpas/unpas.component';
import { PlusieurspasComponent } from './plusieurspas/plusieurspas.component';

const routes: Routes = [
  { path: 'route', component: RouteComponent,
    children:[
      { path: 'acceuil', component:AcceuilComponent },
      { path: 'xn_yn', component:XnYnComponent },
      { path: 'graphe', component:GrapheComponent },
      { path: 'archi', component:ArchiOptimalComponent, 
        children:[
          { path: 'uniteentre', component:UnitentreComponent,
            children:[
              { path: 'unitecache', component:UnitecacheComponent,
                children:[
                  { path: 'apprentissage', component:ApprentissageComponent, 
                    children:[
                      { path:'unpas',component:UnpasComponent,
                        children:[
                          {path:'plusieurs',component:PlusieurspasComponent}
                        ]
                      },
                      
                    ]
                  },
                ]
               },
            ]
           },
          
        ]
      },
      
      
     
     
    ]
  },
  { path: '', redirectTo: 'route/acceuil', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
