import { NgModule }    from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { BasicComponent }  from './basic.component';
import { BasicAllComponent }  from './basicAll.component';
import { BasicChangeComponent }  from './basicChange.component';
import { BasicNewComponent }  from './basicNew.component';

import { AuthGuard }                from '../auth-guard.service';

const basicRoutes: Routes = [
  {
    path:'basic',
    redirectTo:'/basic/all/1',
    pathMatch:'full'
  },
  {
    path:'basic',
    component:BasicComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'all/:id',
            component: BasicAllComponent
          },
          {
            path: 'change/:id',
            component: BasicChangeComponent,
          },
          {
            path: 'new',
            component: BasicNewComponent
          },
          {
            path:'all',
            redirectTo:'all/1',
            pathMatch:'full'
          },
          {
            path:'change',
            redirectTo:'change/1',
            pathMatch:'full'
          },
        ]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(basicRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BasicRoutingModule { }
