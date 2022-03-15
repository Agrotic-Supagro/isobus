import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IsobusFirebaseService } from './isobus-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class IsobusCodesessionService {
  codeSession : any;
  codeJoueur = 'joueur';
  codeAnimateur = 'animateur';
  statut = '';
  nom = '';
  constructor(    
    private router:Router,
    private FirebaseService:IsobusFirebaseService,
  ) { }

  /*testCodeSession(codeSession: string){
    if (codeSession == this.codeAnimateur) {
      this.statut = 'Animateur';
    } else if(codeSession == this.codeJoueur) {
      this.statut = 'Joueur';
    }    
    this.codeSession = codeSession
    return this.statut;
  }*/

  joinSession(form: NgForm, statut: string) {
    this.codeSession = this.FirebaseService.codesession;
    this.codeJoueur = this.FirebaseService.codesession;
    if(statut == "animateur"){
      this.codeAnimateur = form.value['codesession'];
      sessionStorage.setItem('codeAnimateur', JSON.stringify(this.codeAnimateur));
    }
    this.nom = form.value['nom'];
    this.statut = statut;
    sessionStorage.setItem('codeSession', JSON.stringify(this.codeSession));    
    sessionStorage.setItem('statut', JSON.stringify(this.statut));
    sessionStorage.setItem('nom', JSON.stringify(this.nom));
    this.router.navigate(['choixRole']);
  }

  createSession(form: NgForm) {
    this.codeJoueur = form.value['codejoueur'];
    this.codeAnimateur = form.value['codeanimateur'];
    this.nom = form.value['nom'];
    this.codeSession = this.codeJoueur;
    this.statut = 'animateur';
    sessionStorage.setItem('codeAnimateur', JSON.stringify(this.codeAnimateur));
    sessionStorage.setItem('codeSession', JSON.stringify(this.codeSession));    
    sessionStorage.setItem('statut', JSON.stringify(this.statut));
    sessionStorage.setItem('nom', JSON.stringify(this.nom));
    this.router.navigate(['choixRole']);
  }

  isSessionStarted() {
    var codeSession = sessionStorage.getItem('codeSession');
    var statut = sessionStorage.getItem('statut');
    var codeAnimateur = sessionStorage.getItem('codeAnimateur');
    var nom = sessionStorage.getItem('nom');  
    if (codeSession === null || statut === null) {
      this.router.navigate(['accueil']);
    } else {
      this.codeSession = JSON.parse(codeSession);
      this.codeJoueur = JSON.parse(codeSession);
      this.FirebaseService.codesession = JSON.parse(codeSession)
      this.statut = JSON.parse(statut);
      if (nom !== null) {
        this.nom = JSON.parse(nom);
      }
      if( codeAnimateur !== null) {        
        this.codeAnimateur = JSON.parse(codeAnimateur);
      }
    }
  }
}
