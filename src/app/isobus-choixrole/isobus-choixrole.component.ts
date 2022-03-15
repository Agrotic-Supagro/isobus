import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsobusCodesessionService } from '../isobus-codesession.service';
import { IsobusListeroleService } from '../isobus-listerole.service';
import { IsobusFirebaseService } from '../isobus-firebase.service';

@Component({
  selector: 'app-isobus-choixrole',
  templateUrl: './isobus-choixrole.component.html',
  styleUrls: ['./isobus-choixrole.component.scss']
})
export class IsobusChoixroleComponent implements OnInit {
  statut: any;
  numSession: any;
  listeRole : any;
  choixmateriel= 2;
  roleJoueur: any;
  testNomDefaut = "Roger";
  listeJoueurRole = [];
  nbRoleNonPourvu = -1;

  constructor(
    private router:Router,
    public CodeSessionService: IsobusCodesessionService,  
    public RolesService : IsobusListeroleService,
    public IsobusFirebase: IsobusFirebaseService,  
    ) { }

  ngOnInit(): void {
    this.CodeSessionService.isSessionStarted();        
    var mat = sessionStorage.getItem('mat');
    if (mat !== null){
      this.choixmateriel = JSON.parse(mat);
    }
    this.statut = this.CodeSessionService.statut;
    this.numSession = this.CodeSessionService.codeSession;   
    this.IsobusFirebase.getListeJoueurs();
    if(this.statut == "joueur"){
      this.IsobusFirebase.enAttenteduJeu();
    }
  }

  choixMateriel(mat: any) {
    this.choixmateriel = mat;
    if(this.choixmateriel == 0) {
      this.listeRole = this.RolesService.listeRole[0].roles;
    } else if(this.choixmateriel == 1) {      
      this.listeRole = this.RolesService.listeRole[1].roles;
    }
    this.nbRoleNonPourvu = this.listeRole.length;
    sessionStorage.setItem('mat', JSON.stringify(this.choixmateriel));
  }

  selectOnChange(role: any, joueur: any) {
    for (var i = 0; i < this.IsobusFirebase.listeJoueursSansRole.length; i++){
      if(this.IsobusFirebase.listeJoueursSansRole[i] == joueur.target.value){
        this.IsobusFirebase.listeJoueursSansRole.splice(i,1);
      }
    }
    if (this.RolesService.listeRole[this.choixmateriel].roles[role].joueur != ''){
      var ancienJoueur = this.RolesService.listeRole[this.choixmateriel].roles[role].joueur;
      this.RolesService.listeRole[this.choixmateriel].roles[role].joueur = joueur.target.value;
      var autreRole = false;
      for (var i=0; i< this.RolesService.listeRole[this.choixmateriel].roles.length; i++) {
        if (this.RolesService.listeRole[this.choixmateriel].roles[i].joueur == ancienJoueur){
          autreRole = true;
        }
      }
      if (autreRole === false){
        this.IsobusFirebase.listeJoueursSansRole[this.IsobusFirebase.listeJoueursSansRole.length] = ancienJoueur;
      }
      if (joueur.target.value == ""){        
        this.nbRoleNonPourvu += 1;
      }
    } else {
      this.RolesService.listeRole[this.choixmateriel].roles[role].joueur = joueur.target.value;
      this.nbRoleNonPourvu -= 1;
    }
    if (joueur.target.value == "nojoueur"){
    }
    console.log(this.RolesService.listeRole[this.choixmateriel].roles);
    this.listeRole = this.RolesService.listeRole[this.choixmateriel].roles;
    console.log(this.listeRole);
  }

  validateRole(formrole: any) {
    let values = formrole.value;
    console.log(document.getElementById('calculateur1')?.innerText);
    console.log(values)
    console.log(this.listeRole)
    console.log(this.choixmateriel)
    this.IsobusFirebase.enregisterRoleJoueur();
    //this.IsobusFirebase.commencerLeJeu();
  }

}
