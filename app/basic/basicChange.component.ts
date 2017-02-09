import 'rxjs/add/operator/switchMap';
import { Component,Input,OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Work }      from './work';
import { WorkService } from './work-service';
import { ValidateService }  from '../validate.service';

@Component({
  moduleId:module.id,
  selector: 'basicChange',
  templateUrl: 'basicChange.component.html'
})
export class BasicChangeComponent implements OnInit{
  work:Work;
  constructor(
    private workService:WorkService,
    private route: ActivatedRoute,
    private location: Location,
    private validateService:ValidateService,
    private router:Router
  ){}
  toDelete():void{
    this.workService.delete(this.work.id).then(() => this.goback())
  }
  ngOnInit(): void {
    //從路由處獲取預先加載的信息
    this.route.data.subscribe((data:{work:Work}) => this.work = data.work);
    // this.route.params
    //   .switchMap((params: Params) => this.workService.getWork(+params['id']))
    //   .subscribe(work => this.work = work);
  }
  passNum:number;
  save(form:any): void {
    this.passNum=0;
    let that = this;
    for(let i=0;i<form.children.length-1;i++){
      let item:any = form.children[i].children[1].children[0];
      this.check(item,form).then((function(item) {
        //計算通過項目
        that.passNum = item.Error?that.passNum-1:that.passNum+1;
        that.passNum = Math.max(that.passNum,0);
        //判定通過項目是否都通過
        if(that.passNum === form.children.length-1){
          that.workService.update(that.work).then(() => that.location.back())
        }
      }));
    }
  }
  goback(): void{
    this.location.back();
    // this.router.navigate(['/queryWork',{id:3}])
  }
  //單獨輸入塊驗證
  check(item:any,form:any): Promise<any>{
      let _this = this
      let other:any = item.dataset["vEqualto"]?form.children[+item.dataset["vEqualto"]].children[1].children[0]:"";
      return this.validateService.check(item,other).then(function(prams) {
        prams.item.Error = prams.mes;
        prams.item.pass=!prams.mes;
        return Promise.resolve(prams.item);
      });
  }
}
