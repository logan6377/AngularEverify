import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated'; 

@Injectable()
export class EmailcheckService {

      clients;

      private api = 'https://app.verify-email.org/api/v1/';

      //jjZodIbEGuz4Mk88b8WLLdntzCflkWx2qZ88WMUMNiC9g9C8zr  /verify/

      private showList = new BehaviorSubject(false);
      showListStatus = this.showList.asObservable();

      private inputValue = new BehaviorSubject('');
      inputValueChange = this.inputValue.asObservable();

      constructor(private http:HttpClient/* ,public db: AngularFireDatabase */) { 

            //this.clients = this.db.list('/Data') as FirebaseListObservable<any[]>;
    
      }
    
      verifyEmail(email, api){
            let key = this.api + api + /verify/ 
          console.log(email)
          return this.http.get(key+email, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
      }

      changeMessage(showhide: boolean) {
            this.showList.next(showhide);
      }

      changeValue(value: string) {
            this.inputValue.next(value);
      }

      /* getClients(){
            return this.clients;
      } */

}
