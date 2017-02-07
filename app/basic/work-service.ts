import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Work } from './work';
// import { WORKS } from './mock-works';

@Injectable()
export class WorkService {

  private worksUrl = 'app/works';
  private pageUrl = 'app/page';
  constructor(private http: Http) { }

  // getWorks(): Promise<Work[]>{
  //   return Promise.resolve(WORKS);
  // }
  getPage(): Promise<any> {
    return this.http.get(this.pageUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }
  getWorks(): Promise<Work[]> {
    return this.http.get(this.worksUrl)
               .toPromise()
               .then(response => response.json().data as Work[])
               .catch(this.handleError);
  }
  getWork(id:number): Promise<Work>{
    return this.getWorks().then(works => works.find(work => work.id === id));
  }
  getPageWorks(id:number):Promise<Work[]>{
    return this.getWorks().then(works => works.slice(10*(id-1),10*id));
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  private headers = new Headers({'Content-Type': 'application/json'});

  update(work: Work): Promise<Work> {
    const url = `${this.worksUrl}/${work.id}`;
    return this.http
      .put(url, JSON.stringify(work), {headers: this.headers})
      .toPromise()
      .then(() => work)
      .catch(this.handleError);
  }
  delete(id:number): Promise<void>{
    const url = `${this.worksUrl}/${id}`;
    return this.http.delete(url,{headers:this.headers})
              .toPromise()
              .catch(this.handleError);
  }
  create(a:any): Promise<void>{
    return this.http.post(this.worksUrl,JSON.stringify(a),{headers: this.headers})
              .toPromise()
              .catch(this.handleError);
  }
}
