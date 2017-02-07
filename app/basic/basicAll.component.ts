import 'rxjs/add/operator/switchMap';
import { Component, OnInit }                         from '@angular/core';
import { Router, ActivatedRoute, Params }            from '@angular/router';

import { WorkService } from './work-service';
import { Work } from './work';

@Component({
  moduleId:module.id,
  selector: 'basicAll',
  templateUrl: 'basicAll.component.html',
  styleUrls: ['basicAll.component.css'],
})

export class BasicAllComponent implements OnInit {
  selectWork:Work;
  works:Work[]
  constructor(
    private workService:WorkService,
    private router:Router,
    private route:ActivatedRoute
  ){}

  //提高ngFor的渲染效率，不去更新相同的DOM
  trackByWorks(index: number, work: Work) { return work.id; };

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.workService.getPageWorks(+params['id']))
      .subscribe(works => this.works = works);
    // this.getWorks();
  }
  getWorks(): void{
    this.workService.getWorks().then(works => this.works = works);
  }
  //跳轉到選擇的項目
  getWork(i:number){
    this.selectWork = this.works[i];
    this.router.navigate(['/basic/change',this.selectWork.id]);
  };
}
