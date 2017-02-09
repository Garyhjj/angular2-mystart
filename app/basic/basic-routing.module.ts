import { NgModule }    from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { BasicComponent }  from './basic.component';
import { BasicAllComponent }  from './basicAll.component';
import { BasicChangeComponent }  from './basicChange.component';
import { BasicNewComponent }  from './basicNew.component';

import { AuthGuard }                from '../auth-guard.service';

import { CanDeactivateGuard }    from './can-deactivate.service';

import { WorksResolve }          from './works-resolve.service'

import { WorkResolve }          from './work-resolve.service'

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
            component: BasicAllComponent,
            resolve:{
              works:WorksResolve
            }
          },
          {
            path: 'change/:id',
            component: BasicChangeComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve:{
              work:WorkResolve
            }
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
  ],
  providers: [
    WorksResolve,
    WorkResolve
  ]
})
export class BasicRoutingModule { }
