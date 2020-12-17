import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from '../models/bugs.model';

@Injectable({
  providedIn: 'root',
})
export class BugsService {
  private readonly endpoint: string =
    'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) {}

  // getBugsAll(): Observable<Bugs[]> {
  //   return this.http.get<Bugs[]>(this.endpoint);
  // }

  getBugsSorted(value: string, order: string) {
    return this.http.get<Bugs[]>(`${this.endpoint}?sort=${value},${order}`);
  }

  getBugs(order: boolean, filter = 'title'): Observable<Bugs[]> {
    let query =
      this.endpoint + '?sort=' + filter + ',' + (order ? 'asc' : 'desc');
    return this.http.get<Bugs[]>(query);
  }

  deleteBug(id: string) {
    // console.log(this.endpoint+'/'+id)
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  postBug(bug: Bugs) {
    return this.http.post(this.endpoint, bug);
  }

  updateBug(id: string, bug: Bugs) {
    return this.http.put(this.endpoint + '/' + id, bug);
  }

  getBugById(id: string): Observable<Bugs> {
    return this.http.get<Bugs>(this.endpoint + '/' + id);
  }

  getBugsByPage(pageNumber: number): Observable<HttpResponse<Bugs[]>> {
    return this.http.get<Bugs[]>(this.endpoint + '?page=' + pageNumber, {observe: 'response'});
  }

  getBugsByForm(bug: Bugs): Observable<Bugs[]> {
    let params = new URLSearchParams();
    for (let key in bug) {
      if(bug[key] != null){
        params.set(key, bug[key]);
      }
    }
    console.log(params)
    return this.http.get<Bugs[]>(this.endpoint + '?' + params);
  }

  getBugsByQuery(query: string): Observable<Bugs[]> {
    return this.http.get<Bugs[]>(this.endpoint + '?' + query);
  }
}
