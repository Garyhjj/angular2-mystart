import { Component } from '@angular/core';
import { WorkService} from './work-service';
import { Location }                 from '@angular/common';
import { ValidateService }  from '../validate.service';
import { Work }  from './work';

@Component({
  moduleId:module.id,
  selector: 'basicNew',
  templateUrl: 'basicNew.component.html'
})

export class BasicNewComponent {
  constructor(
    private workService:WorkService,
    private location: Location,
    private validateService:ValidateService
  ){}
//提交創建前內部驗證

  passNum:number;
  new(form:any,newWork:Work):void{
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
          that.workService.create(newWork).then(() => that.location.back());
        }
      }));
    }
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
