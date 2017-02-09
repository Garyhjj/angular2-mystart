import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { Work } from './work'
import { WorkService } from './work-service';

@Injectable()
export class WorkResolve implements Resolve<Work|any> {
  constructor(private ws: WorkService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Promise<Work>|boolean {
    let id = route.params['id'];
    return this.ws.getWork(+id).then(work => {
      if (work) {
        return work;
      } else { // id not found
        this.router.navigate(['/basic']);
        return false;
      }
    });
  }
}
