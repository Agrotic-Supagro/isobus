import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getDocs, getFirestore, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'isobus';

  constructor() {};

}
