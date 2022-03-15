import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsobusListeroleService {
  listeRole = [
    {
      id: 1,
      name: 'Pulvérisateur',
      roles : [
        {
          idrole: 'calculateur1',
          nameRole: 'Calculateur de débit',
          consigne: 'Calculer le débit à appliquer',
          joueur: '',
        },
        {
          idrole: 'calculateur2',
          nameRole: 'Calculateur de consigne',
          consigne: 'Calculer la liste des buses à ouvrir',
          joueur: '',
        },
        {
          idrole: 'traceur',
          nameRole: 'Traceur',
          consigne: 'Enregistrement du volume réellement appliqué',
          joueur: '',
        },
        {
          idrole: 'buseRose',
          nameRole: 'Buse Rose',
          consigne: '0,007 l/s. Renvoie son activité.',
          joueur: '',
        },
        {
          idrole: 'buseOrange',
          nameRole: 'Buse Orange',
          consigne: '0,0014 l/s. Renvoie son activité.',
          joueur: '',
        },
        {
          idrole: 'buseVert',
          nameRole: 'Buse Verte',
          consigne: '0,02 l/s. Renvoie son activité.',
          joueur: '',
        },
        {
          idrole: 'buseJaune',
          nameRole: 'Buse Jaune',
          consigne: '0,03 l/s. Renvoie son activité.',
          joueur: '',
        },
      ]
    },
    {
      id: 2,
      name: 'Tracteur',
      roles : [
          {
            idrole: 'calculateur1',
            nameRole: 'Calculateur de vitesse de rotation',
            consigne: 'Calculer la vitesse de rotation du moteur',
            joueur: '',
          },
          {
            idrole: 'calculateur2',
            nameRole: 'Calculateur de vitesse',
            consigne: 'Calculer la vitesse d\'avancement',
            joueur: '',
          },
          {
            idrole: 'calculateur3',
            nameRole: 'Calculateur de consommation',
            consigne: 'Calculer la consommation horaire du moteur',
            joueur: '',
          },
          {
            idrole: 'traceur',
            nameRole: 'Traceur',
            consigne: 'Stocker les résultats de la simulation',
            joueur: '',
          },
      ]
    }
  ];


  constructor() { }
}
