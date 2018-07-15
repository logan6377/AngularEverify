import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { EmailcheckService } from '../emailcheck.service';

@Component({
  selector: 'app-everify-list',
  templateUrl: './everify-list.component.html',
  styleUrls: ['./everify-list.component.css']
})
export class EverifyListComponent implements OnInit {

itemValue = '';
items: Observable<any[]>;

inputValue:string

constructor(public db: AngularFireDatabase, private eservice:EmailcheckService) {

      this.eservice.inputValueChange.subscribe(res => this.inputValue = res);
      this.items = db.list(this.inputValue).valueChanges(); 
      console.log('aaaaaa', this.items)
}

  ngOnInit() {

  }

}
