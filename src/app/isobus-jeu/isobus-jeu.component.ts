import { Component, OnInit } from '@angular/core';
import { IsobusCodesessionService } from '../isobus-codesession.service';

@Component({
  selector: 'app-isobus-jeu',
  templateUrl: './isobus-jeu.component.html',
  styleUrls: ['./isobus-jeu.component.scss']
})
export class IsobusJeuComponent implements OnInit {
  statut: any;
  numSession: any;

  constructor(
    public CodeSessionService: IsobusCodesessionService,  ) { }

  ngOnInit(): void {
    this.statut = this.CodeSessionService.statut;
    this.numSession = this.CodeSessionService.codeSession;  
  }

}
