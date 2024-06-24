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


@NgModule({
  declarations: [
    AppComponent,
    MenueComponent,
    AcceuilComponent,
    RouteComponent,
    XnYnComponent,
    GrapheComponent,
    ArchiOptimalComponent,
    ApprentissageComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
