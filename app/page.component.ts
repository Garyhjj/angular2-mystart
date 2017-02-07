import 'rxjs/add/operator/switchMap';
import { Component, OnInit }     from '@angular/core';
import { Router, ActivatedRoute, Params }              from '@angular/router';
import { WorkService } from './basic/work-service';

@Component({
  moduleId:module.id,
  selector: 'page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.css'],
  providers: [WorkService]
})

export class PageComponent implements OnInit{
  constructor(
    private workService:WorkService,
    private router:Router,
    private route:ActivatedRoute
  ){};
  pageMes:{
    pageSize:number,//每頁容量
    pageTotal:number//總頁數
  };
  pageShow={
    first:1,
    second:2,
    third:3,
    fourth:4,
    fifth:5
  };
  pageSelected:number = 1;
  ngOnInit(){
    let _this_ = this;
    //獲取服務器提供的頁碼信息并讀取瀏覽地址的頁碼
    this.workService.getPage().then(function(pageMes) {
      _this_.pageMes= pageMes;
    }).then(() => _this_.route.params.forEach(function(params:Params){
      for(let prop in params){
        _this_.pageSelected = + params[prop];
        _this_.pageMes && _this_.jump(_this_.pageSelected);
      }
    }));
  }
  //頁碼渲染
  pageRender(change:number){
    let i = 0;
    for(let prop in this.pageShow){
      this.pageShow[prop] = this.pageSelected -change+i
      i++;
    }
  }
  //頁碼跳轉
  jump(i:number): void{
    this.pageSelected=i;
    if(this.pageMes.pageTotal && this.pageSelected > this.pageShow.fifth-2 && this.pageSelected < this.pageMes.pageTotal-1 || this.pageSelected < this.pageShow.first+2 && this.pageSelected > 2){
      this.pageRender(2);
    };
    //當從前面選擇倒數第二頁時重新渲染顯示的頁碼信息
    if(this.pageSelected === this.pageMes.pageTotal-1 && this.pageShow.fifth === this.pageMes.pageTotal-1){
      this.pageRender(3);
    }
    //當從後面選擇第二頁時重新渲染顯示的頁碼信息
    if(this.pageSelected === 2 && this.pageShow.first ===2){
      this.pageRender(1);
    }
    this.router.navigate(['./basic/all',this.pageSelected]);
  }
  prePage(): void{
    (this.pageSelected>1) && this.jump(this.pageSelected-1);
  }
  nextPage(): void{
    (this.pageSelected<this.pageMes.pageTotal) && this.jump(this.pageSelected+1);
  }
}
