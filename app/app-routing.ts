import { NgModule }      from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { MaintainPlanComponent }  from './maintainPlan/maintainPlan.component';
import { DailyWorkComponent }  from './dailyWork/dailyWork.component';
import { QueryWorkComponent }  from './queryWork/queryWork.component';
import { PageNotFoundComponent } from './page-notFound.component';

import { CanDeactivateGuard } from './basic/can-deactivate.service';

const routes:Routes = [
  {
    path:'',
    redirectTo:'/basic/all/1',
    pathMatch:'full'
  },
  {
    path:'maintainPlan',
    component: MaintainPlanComponent
  },
  {
    path:'dailyWork',
    component: DailyWorkComponent
  },
  {
    path:'queryWork',
    component: QueryWorkComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    CanDeactivateGuard
  ]
})

export class AppRoutingModule {}
