import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { EmailcheckService } from './emailcheck.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  

  constructor(public db: AngularFireDatabase, private eservice:EmailcheckService) { 
  }

  onSubmit() { 
  }
}
