import { Injectable }     from '@angular/core';
import { CanActivate, //守卫，处理导航到某路由的情况。
         Router,
         ActivatedRouteSnapshot,  //
         RouterStateSnapshot, //
         CanActivateChild }    from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {

  constructor(
     private router: Router
   ) {}
  canActivate( route: ActivatedRouteSnapshot , state: RouterStateSnapshot){
    // this.router.navigate(['./queryWork'])
    return true;
    }
  canActivateChild(): boolean {
    console.log('AuthGuard#canActivate called');
    return true;
  }
}
