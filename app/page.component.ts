/*
組件需要傳入的數據結構
{
  pageSize:number,//每頁容量
  dataTotal:number,//總數據數量
  currPage:number,//目前頁碼
  currRoute:string,//目前除頁碼id的路由地址
}
 */

import { Component, OnInit, Input }     from '@angular/core';
import { Router }              from '@angular/router';

@Component({
  moduleId:module.id,
  selector: 'page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.css'],
})

export class PageComponent implements OnInit{
  @Input("mypage")
  pageMes:{
    pageSize:number,//每頁容量
    dataTotal:number,//總數據數量
    currPage:number,//目前頁碼
    currRoute:string,//目前除頁碼id的路由地址
  };
  constructor(
    private router:Router,
  ){};

  pageTotal:number;

  pageShow={
    first:1,
    second:2,
    third:3,
    fourth:4,
    fifth:5
  };
  pageSelected:number;
  ngOnInit(){
    this.pageTotal= Math.ceil(this.pageMes.dataTotal/this.pageMes.pageSize);
    //確定當前頁碼
    this.pageSelected = isNaN(+this.pageMes.currPage)? 1: this.pageMes.currPage;
    //跳轉并渲染
    this.jump(this.pageSelected);
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
    if(this.pageTotal && this.pageSelected > this.pageShow.fifth-2 && this.pageSelected < this.pageTotal-1 || this.pageSelected < this.pageShow.first+2 && this.pageSelected > 2){
      this.pageRender(2);
    };
    //當從前面選擇倒數第二頁時重新渲染顯示的頁碼信息
    if(this.pageSelected === this.pageTotal-1 && this.pageShow.fifth === this.pageTotal-1){
      this.pageRender(3);
    }
    //當從後面選擇第二頁時重新渲染顯示的頁碼信息
    if(this.pageSelected === 2 && this.pageShow.first ===2){
      this.pageRender(1);
    }
    this.router.navigate([this.pageMes.currRoute? this.pageMes.currRoute :'./',this.pageSelected]);
  }
  prePage(): void{
    (this.pageSelected>1) && this.jump(this.pageSelected-1);
  }
  nextPage(): void{
    (this.pageSelected<this.pageTotal) && this.jump(this.pageSelected+1);
  }
}
