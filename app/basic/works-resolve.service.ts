import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { Work } from './work'
import { WorkService } from './work-service';

@Injectable()
export class WorksResolve implements Resolve<Work[]|any> {
  constructor(private ws: WorkService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Promise<Work[]>|boolean {
    let id = route.params['id'];
    return this.ws.getPageWorks(+id).then(works => {
      if (works.length>0) {
        return works;
      } else { // id not found
        this.router.navigate(['/basic']);
        return false;
      }
    });
  }
}
