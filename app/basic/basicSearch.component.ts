import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { WorkSearchService } from './workSearch.service';
import { Work } from './work';
@Component({
  moduleId: module.id,
  selector: 'basicSearch',
  templateUrl: 'basicSearch.component.html',
  styleUrls:["basicSearch.component.css"],
  providers: [WorkSearchService]
})
export class BasicSearchComponent  {
  works: Observable<Work[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private workSearchService: WorkSearchService,
    private router: Router) {}
  // keyup觸發的方法
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.works = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.workSearchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Work[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Work[]>([]);
      });
  }
  gotoDetail(work: Work): void {
    let link = ['/basic/change', work.id];
    this.router.navigate(link);
  }
}
