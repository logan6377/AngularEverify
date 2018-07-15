import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'; 
import { EmailcheckService } from '../emailcheck.service';

@Component({
  selector: 'app-emailtest',
  templateUrl: './emailtest.component.html',
  styleUrls: ['./emailtest.component.css']
})
export class EmailtestComponent {

itemValue = '';
items: Observable<any[]>;
showElist:boolean = false;



constructor(public db: AngularFireDatabase, private eservice:EmailcheckService) {
      this.items = db.list('items').valueChanges(); 
      this.eservice.showListStatus.subscribe(res => this.showElist = res);
}

onSubmit() {
      this.db.list('/items').push({ content: this.itemValue });
      this.itemValue = '';
}

} 