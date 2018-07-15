import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailcheckService } from './emailcheck.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { EverifyComponent } from './everify/everify.component';
import { EverifyListComponent } from './everify-list/everify-list.component';
import { VerifiedListComponent } from './verified-list/verified-list.component';
import { EmailtestComponent } from './emailtest/emailtest.component';

const appRoutes: Routes = [
      { path: '', component: EmailtestComponent },
      { path: 'verify',      component: VerifiedListComponent } 
];

/* const appRoutes: Routes = [
      { path: '', component: VerifiedListComponent }
]; */
    


@NgModule({
  declarations: [
    AppComponent,
    EverifyComponent,
    EverifyListComponent,
    VerifiedListComponent,
    EmailtestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
      HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    RouterModule.forRoot(appRoutes) 
  ],
  providers: [EmailcheckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
