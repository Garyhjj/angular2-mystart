import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'queryWork',
  template: `<h1>hello queryWork</h1>
  <router-outlet></router-outlet>
  `,
})
export class QueryWorkComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
  ){}

  ggg: Observable<any[]>;

  id: number;
  ngOnInit(){
    console.log(22);
    this.route.params.switchMap((params: Params) => {
        var id = +params['id'];
        console.log(params['id']);
        return Observable.of<any>(id+3);
      }).subscribe((id)=> console.log(id))
  }
}
