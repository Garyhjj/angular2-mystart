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
  works:Work[];
  mypage:{
    pageSize:number,//每頁容量
    dataTotal:number,//總數據數量
    currPage:number,//目前頁碼
    currRoute:string,//目前除頁碼id的路由地址
    pageLength:number//顯示的最多頁碼數
  };
  constructor(
    private workService:WorkService,
    private router:Router,
    private route:ActivatedRoute
  ){}

  //提高ngFor的渲染效率，不去更新相同的DOM
  trackByWorks(index: number, work: Work) { return work.id; };

  ngOnInit(): void {
    //獲取數據
    // this.getWorks();
    //獲取數據分頁信息
    this.workService.getPage().then((mypage) => {
      var tempMypage = mypage;
      //從路由處獲取預先加載的信息
      this.route.data.subscribe((data:{works:Work[]}) => this.works = data.works);

      this.route.params.forEach((params) => {
        tempMypage.currPage = +params['id'];
      });
      tempMypage.currRoute = './basic/all';
      tempMypage.pageLength = 7;
      this.mypage = tempMypage;
    });
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
