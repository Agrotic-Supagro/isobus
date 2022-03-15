import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IsobusCodesessionService } from '../isobus-codesession.service';
import { AppComponent } from '../app.component';
import { IsobusFirebaseService } from '../isobus-firebase.service';

@Component({
  selector: 'app-isobus-accueil',
  templateUrl: './isobus-accueil.component.html',
  styleUrls: ['./isobus-accueil.component.scss']
})
export class IsobusAccueilComponent implements AfterViewInit {
  numSession = '';
  session: any;

  constructor(
    private router:Router,
    private CodeSessionService: IsobusCodesessionService,
    private IsobusFirebase: IsobusFirebaseService,
    ) { }

  ngAfterViewInit(): void {
  }

  newSession() {
    this.router.navigate(['newSession']);
  }

  async joinSessionAccueil(form: NgForm) {
    await this.IsobusFirebase.checkSession(form.value['codesession'], form.value['nom']).then(data => {
      if(data == "animateur"){        
        this.CodeSessionService.joinSession(form, "animateur");
      } else if(data == 'joueur'){
        this.CodeSessionService.joinSession(form, "joueur");
      }
    });
  }

}
