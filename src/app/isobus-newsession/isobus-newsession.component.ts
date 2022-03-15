import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IsobusCodesessionService } from '../isobus-codesession.service';
import { IsobusFirebaseService } from '../isobus-firebase.service';

@Component({
  selector: 'app-isobus-newsession',
  templateUrl: './isobus-newsession.component.html',
  styleUrls: ['./isobus-newsession.component.scss']
})
export class IsobusNewsessionComponent implements OnInit {

  constructor(
    private router:Router,
    private CodeSessionService: IsobusCodesessionService,
    private IsobusFirebase: IsobusFirebaseService,  
    ) { }

  ngOnInit(): void {
  }

  joinSessionNew(form: NgForm) {
    this.IsobusFirebase.addSession(form.value['codejoueur'],form.value['codeanimateur'], form.value['nom']).then(() =>
      this.CodeSessionService.createSession(form));
  }

}
