import { Component } from '@angular/core';

@Component({
  moduleId:module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent  {
  user:string = "jinzhi.he";
  tabMessages = [
    {name:'基本資料建檔',route:'/basic'},
    {name:'保養計劃',route:'/maintainPlan'},
    {name:'日常作業',route:'/dailyWork'},
    {name:'查詢作業',route:'/queryWork'}];
}
