import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import './rxjs-extension';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryService }  from './in-memory.service';

import { AppComponent }  from './app.component';
import { MaintainPlanComponent }  from './maintainPlan/maintainPlan.component';
import { DailyWorkComponent }  from './dailyWork/dailyWork.component';
import { QueryWorkComponent }  from './queryWork/queryWork.component';
import { PageNotFoundComponent } from './page-notFound.component';
import { AppRoutingModule }     from './app-routing';

import { ValidateService } from './validate.service';
import { AuthGuard }                from './auth-guard.service';

import { BasicModule }  from './basic/basic.module'

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryService),
    AppRoutingModule,
    BasicModule
   ],
  declarations: [
    AppComponent,
    MaintainPlanComponent,
    DailyWorkComponent,
    QueryWorkComponent,
    PageNotFoundComponent
  ],
  providers:[ValidateService, AuthGuard],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
