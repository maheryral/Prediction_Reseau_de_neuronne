import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenueComponent } from './menue/menue.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AppRoutingModule } from './app-routing.module';
import { RouteComponent } from './route/route.component';
import { XnYnComponent } from './xn-yn/xn-yn.component';
import { GrapheComponent } from './graphe/graphe.component';
import { ArchiOptimalComponent } from './archi-optimal/archi-optimal.component';
import { ApprentissageComponent } from './apprentissage/apprentissage.component';
import { UnitentreComponent } from './unitentre/unitentre.component';
import { UnitecacheComponent } from './unitecache/unitecache.component';
import { UnpasComponent } from './unpas/unpas.component';
import { PlusieurspasComponent } from './plusieurspas/plusieurspas.component';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
  declarations: [
    AppComponent,
    MenueComponent,
    AcceuilComponent,
    RouteComponent,
    XnYnComponent,
    GrapheComponent,
    ArchiOptimalComponent,
    ApprentissageComponent,
    UnitentreComponent,
    UnitecacheComponent,
    UnpasComponent,
    PlusieurspasComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],

  bootstrap: [AppComponent]
})
export class AppModule { }
