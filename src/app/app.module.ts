import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IsobusAccueilComponent } from './isobus-accueil/isobus-accueil.component';
import { IsobusNewsessionComponent } from './isobus-newsession/isobus-newsession.component';
import { IsobusChoixroleComponent } from './isobus-choixrole/isobus-choixrole.component';
import { IsobusJeuComponent } from './isobus-jeu/isobus-jeu.component';

@NgModule({
  declarations: [
    AppComponent,
    IsobusAccueilComponent,
    IsobusNewsessionComponent,
    IsobusChoixroleComponent,
    IsobusJeuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
