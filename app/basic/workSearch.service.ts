import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Work }           from './work';


@Injectable()
export class WorkSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Work[]> {
    return this.http
               .get(`app/works/?name=${term}`)
               .map((r: Response) => r.json().data as Work[]);
  }
}
