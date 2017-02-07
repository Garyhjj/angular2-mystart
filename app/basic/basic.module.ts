import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BasicRoutingModule } from './basic-routing.module';

import { PageComponent }      from '../page.component';

import { BasicComponent }  from './basic.component';
import { BasicAllComponent }  from './basicAll.component';
import { BasicChangeComponent } from './basicChange.component';
import { BasicNewComponent } from './basicNew.component';
import { BasicSearchComponent } from './basicSearch.component';
import { WorkService } from './work-service';

@NgModule({
  imports:      [ CommonModule, BasicRoutingModule,FormsModule, HttpModule ],
  declarations: [
    BasicComponent,
    BasicAllComponent,
    BasicChangeComponent,
    BasicNewComponent,
    BasicSearchComponent,
    PageComponent
  ],
  providers:    [ WorkService ]
})
export class BasicModule {}
