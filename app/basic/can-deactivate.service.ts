import { Injectable }           from '@angular/core';
import { CanDeactivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }  from '@angular/router';

import { BasicChangeComponent } from './basicChange.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<BasicChangeComponent> {

  canDeactivate(
    component: BasicChangeComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    // Get the Crisis Center ID
    console.log(route.params['id']);

    // Get the current URL
    console.log(state.url);

    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    // if (!component.crisis || component.crisis.name === component.editName) {
    //   return true;
    // }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return true;
  }
}