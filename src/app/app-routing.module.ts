import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsobusAccueilComponent } from './isobus-accueil/isobus-accueil.component';
import { IsobusNewsessionComponent } from './isobus-newsession/isobus-newsession.component';
import { IsobusChoixroleComponent } from './isobus-choixrole/isobus-choixrole.component';
import { IsobusJeuComponent } from './isobus-jeu/isobus-jeu.component';

const routes: Routes = [
  { path: 'accueil', component: IsobusAccueilComponent},
  { path: '', component: IsobusAccueilComponent},
  { path: 'newSession', component: IsobusNewsessionComponent},
  { path: 'choixRole', component: IsobusChoixroleComponent},
  { path: 'jeu', component: IsobusJeuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
