import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { EmailcheckService } from '../emailcheck.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-verified-list',
  templateUrl: './verified-list.component.html',
  styleUrls: ['./verified-list.component.css']
})
export class VerifiedListComponent implements OnInit {

  summaries = [];
  count =[];
  countShow;
  showCount = false;
  selection;
  items;
  showTable=false;
  csvDataAll;
  finalList=[];

  alldata=[];

  constructor(public db: AngularFireDatabase, private eservice:EmailcheckService) {  
      this.db.list('/dropdown')
     .valueChanges()
     .subscribe(data=>{  
         this.alldata.push(data);

         for(let i=0; i<this.alldata[0].length; i++){ 
            this.summaries.push(this.alldata[0][i].detail.dd)
            this.count.push(this.alldata[0][i].detail.total)
         } 
      }); 
  }

  filterForeCasts(value){ 
      this.showTable = false;
      this.selection = this.summaries[value];
      this.showCount = true
      this.countShow = this.count[value];


      console.log(this.count)

      this.db.list(this.selection)
      .valueChanges()
      .subscribe(data=>{  
            console.log(data)
            this.showTable = true;
            this.items = data;
            this.csvDataAll = data
      }); 
  }

  jsonToExcel(){
      //this.wholeDate = this.eservice.getClients()
      console.log(this.csvDataAll)

      for(let i =0; i<this.csvDataAll.length; i++){
            this.finalList.push(this.csvDataAll[i].email)
      }
      var options = {  
            headers: ['Email Id', 'status value', 'smtp_code', 'smtp_log', 'status_description'] 
      };
      new Angular2Csv(this.finalList, this.selection+'_verified', options);
}

  ngOnInit() {
      
  }

}
