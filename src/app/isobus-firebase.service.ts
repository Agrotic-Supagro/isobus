import { noUndefined } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, query, addDoc, setDoc, where, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { IsobusListeroleService } from './isobus-listerole.service';

@Injectable({
  providedIn: 'root'
})
export class IsobusFirebaseService {

firebaseconfig = {
  apiKey: "AIzaSyBE7iQOZTpVbUGr2RBTXq7g5ZiNbqe46bk",
  authDomain: "isobus-2316c.firebaseapp.com",
  projectId: "isobus-2316c",
  storageBucket: "isobus-2316c.appspot.com",
  messagingSenderId: "551508558317",
  appId: "1:551508558317:web:1c52bd685bd943350d67e4"
};
firebaseApp = initializeApp(this.firebaseconfig);

db = getFirestore();
document:any;
codesession = '';
listeJoueurs = new Array;
listeJoueursSansRole = new Array;
roleJoueur= "En attente de role...";

//Fonction qui ajoute une session à la base de donnée (si la session existe déjà, elle est nettoyée)
async addSession(codeJoueur: any, codeAnimateur: any, nomjoueur: any) {
  //Création de la session de jeu
  const docRef = await setDoc(doc(this.db, "session_jeu", codeJoueur), {
    code_animateur : codeAnimateur,
    code_joueur : codeJoueur,
    commencer : false,
  });
  this.codesession = codeJoueur;
  //Supression des éléments existants si la session était déjà présente
  var cheminAnimateur = "session_jeu/"+this.codesession+"/animateur";  
  var cheminJoueur = "session_jeu/"+this.codesession+"/joueur";
  var q=query(collection(this.db, cheminAnimateur));
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((docu) => {
    deleteDoc(doc(this.db,cheminAnimateur,docu.id));
  });
  var q=query(collection(this.db, cheminJoueur));
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((docu) => {
    deleteDoc(doc(this.db,cheminJoueur,docu.id));
  });
  //Ajout du créateur de la session comme animateur
  await setDoc(doc(this.db, cheminAnimateur, nomjoueur), {
    nom: nomjoueur,
    statut: "animateur"
  });
}

//Fonction qui vérifie l'existence d'une session en fonction du code en entrée. 
async checkSession(code: any, nomjoueur: any) {
  //Requête 1 dans la base de données d'une session dont le code joueur est celui fournit en entrée.
  const qjoueur = query(collection(this.db, "session_jeu"), where("code_joueur", "==", code));
  const queryResultJoueur = await getDocs(qjoueur);
  if (queryResultJoueur.empty){
    //Si la requête est vide, le code en entrée n'est pas un code joueur, on regarde s'il s'agit d'un code animateur grâce à la requête 2. 
    const qAnimateur = query(collection(this.db, "session_jeu"), where("code_animateur", "==", code));
    const queryResultAnimateur = await getDocs(qAnimateur);
    if (queryResultAnimateur.empty){
      //Si la requête 2 est vide c'est qu'il n'y a pas de session pour ce code. On envoie une alerte.
      alert('Pas de session pour ce code!');
      return "nosession";
    } else {
      //Si la requête 2 n'est pas vide, on connecte l'utilisateur en tant qu'animateur.
      queryResultAnimateur.forEach((doc) => {
        var donnees = doc.data();
        this.codesession = donnees['code_joueur'];
      });
      var test = await this.addjoueur(nomjoueur, "animateur");
      if(test){
        return "animateur";
      } else {
        return "nosession"
      }
    }
  } else {
    // Si la requête 1 n'est pas vide, on connecte l'utilisateur comme joueur.
    this.codesession = code;
    var test = await this.addjoueur(nomjoueur, "joueur");
      if(test){
        return "joueur";
      } else {
        return "nosession"
      }
  }
}

//Fonction qui ajoute dans la base de données l'utilisateur en fonction de son nom et de son statut fournis en entrée.
async addjoueur(nomjoueur:any, statut:any) {  
  var cheminJoueurs = "session_jeu/"+this.codesession+"/"+statut;
  const q=query(collection(this.db, cheminJoueurs), where("nom", "==", nomjoueur));
  const queryResultJoueur = await getDocs(q);
  if(queryResultJoueur.empty){
    const docRef = await setDoc(doc(this.db, cheminJoueurs, nomjoueur), {
      nom: nomjoueur,
      statut: statut,
      role: [],
    });
    return true;
  } else {
    alert("Nom déjà pris");
    return false;
  }
}

//Fonction qui écoute la liste des joueurs de la base de données et met la liste à jour.
async getListeJoueurs() {
  this.listeJoueurs = [];
  this.listeJoueursSansRole = [];
  const unsub = await onSnapshot(collection(this.db, "session_jeu/"+this.codesession+"/joueur"),(querySnapshot) => {
    querySnapshot.docChanges().forEach((change)=> {
      if (change.type === "added"){
        var joueur = change.doc.data()['nom']
        this.listeJoueurs[this.listeJoueurs.length] = joueur;
        this.listeJoueursSansRole[this.listeJoueursSansRole.length] = change.doc.data()['nom'];
      }
    })
  })
}

//Fonction qui écoute la variable de démarrage du jeu et fait naviguer les joueurs vers la page du jeu
async enAttenteduJeu() {
  const unsub = onSnapshot(doc(this.db, "session_jeu", this.codesession),(doc : any) => {
    if(doc.data()['commencer'] === true) {
      this.rooter.navigate(['jeu']);
    }
  })
}

//Fonction qui met à jour la variable de démarrage du jeu par l'animateur.
async commencerLeJeu() {
  const unsub = doc(this.db, "session_jeu", this.codesession)
  await updateDoc(unsub, {
    commencer: true,
  })
}

//Fonction qui enregistre dans la base de donnée pour chaque joueur son ou ses roles.
async enregisterRoleJoueur() {
  var mat = sessionStorage.getItem('mat');
  if (mat !== null) {     
    var listeRole = this.RolesService.listeRole[parseInt(mat)].roles;
    console.log(listeRole);
    var rolejoueur;
    for (var i = 0; i < listeRole.length; i++) {
      if (listeRole[i].joueur !== ''){
        rolejoueur = [listeRole[i].idrole];
        listeRole[i].joueur = '';
        for (var j=i+1; j < listeRole.length; j++) {
          if(listeRole[j].joueur == listeRole[i].joueur){
            rolejoueur[rolejoueur.length] = listeRole[j].idrole;
            listeRole[j].joueur = '';
          }
        }
        console.log(listeRole[i].joueur);
        console.log(rolejoueur)
      }
    }
  }
}

  constructor(
    private RolesService:IsobusListeroleService,
    private rooter:Router
    ) { }
}
