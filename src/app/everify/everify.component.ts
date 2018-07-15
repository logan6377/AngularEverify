import { Component, OnInit, Output } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Angular2Csv } from 'angular2-csv/Angular2-csv'; 
import { EmailcheckService } from '../emailcheck.service';
import { EventEmitter } from 'events'; 
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer'

@Component({
  selector: 'app-everify',
  templateUrl: './everify.component.html',
  styleUrls: ['./everify.component.css']
})
export class EverifyComponent implements OnInit {

      title = 'JavaSampleApproach';
      description = 'Angular5-Firebase Demo';
      textValue: string = "";
      itemValue = '';
      csvData = [];
      csvDataAll = [];
      items: Observable<any[]>;
      uploadedData:string;
      emailListName:string;
      fetchCta:boolean = true;
      alive = true;
      wholeDate:any; 
      loadData=true


 

      constructor(public db: AngularFireDatabase, private eservice:EmailcheckService) {}

      onSubmit() {
            this.db.list('/items').push({ content: this.itemValue });
            this.itemValue = '';
      }

      ngOnInit() {
      }

      handleFileInput(files: FileList) { 
            console.log(files);
            if(files && files.length > 0) {
               let file : File = files.item(0);  
      
                 let reader: FileReader = new FileReader();
                 reader.readAsText(file);
                 reader.onload = (e) => {
                    this.uploadedData = reader.result;
                    //console.log(this.uploadedData);  
                 }
              }
      }


      private checkData(res: Response) {

            this.eservice.changeMessage(true);

            this.eservice.changeValue(this.textValue);

            

            let allTextLines = this.uploadedData.split(/\r\n|\n/); 
            allTextLines = allTextLines.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")}); 
            let headers = allTextLines[0].split(','); 
            let lines = [];
            
            for ( let i = 0; i < allTextLines.length; i++) {
                  let data = allTextLines[i].split(',')[1];  
                  lines.push(data);  
            }

            this.csvData = lines;
            
            this.db.list('/dropdown').push({detail:{
                  'dd':this.textValue,
                  'total': this.csvData.length
            }}); 

            let a = 0;

            Observable.timer(0,1000)
            .takeWhile(() => this.alive) 
            .subscribe(() => {
                  this.eservice.verifyEmail(this.csvData[a]).subscribe(data=> {
                        console.log(status)
                        this.db.list('/'+this.textValue).push({ email: data }); 
                        this.csvDataAll.push(data);  
                  })
                  a++; 
                  if(a==this.csvData.length){
                        this.alive = false;
                        this.loadData = false;
                  }
            }); 
      }
      
      jsonToExcel(){
            //this.wholeDate = this.eservice.getClients()
            //console.log(this.wholeDate)
            new Angular2Csv(this.csvDataAll, 'Verified_List', { headers: Object.keys(this.csvData[0])});
      }
      
      private handleError (error: any) { 
      let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                  console.error(errMsg);  
            return errMsg;
      }

      omit_special_char(event){   
            var k;  
            k = event.charCode;  //         k = event.keyCode;  (Both can be used)
            return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
      }

      checkText(value){
            if(value!=""){
                  this.fetchCta = false
            }else{
                  this.fetchCta = true  
            }
      }

} 
