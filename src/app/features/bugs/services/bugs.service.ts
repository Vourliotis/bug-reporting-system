import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Bugs } from '../models/bugs.model';

@Injectable({
  providedIn: 'root',
})
export class BugsService {
  private readonly endpoint: string =
    'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) {}

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

  getBugs(): Observable<Bugs[]> {
    return this.http.get<Bugs[]>(this.endpoint);
  }

  getBugById(id: string): Observable<Bugs> {
    return this.http.get<Bugs>(this.endpoint + '/' + id);
  }

  getBugsByQuery(params: URLSearchParams, previousParams: URLSearchParams = null): Observable<HttpResponse<Bugs[]>> {
    return this.http.get<Bugs[]>(this.endpoint + '?' + params + '&' + previousParams, {
      observe: 'response',
    });
  }

  createQueryString(
    bug: Bugs = null,
    value: string = null,
    order: boolean = null,
    page: number = null,
  ): URLSearchParams {
    let params = new URLSearchParams();
    for (let key in bug) {
      if (bug[key] != null) {
        params.set(key, bug[key]);
      }
    }
    if (value != null && order != null) {
      params.set('sort', value + ',' + (order ? 'asc' : 'desc'));
    }

    if (page != null) {
      params.set('page', String(page));
    }

    return params;
  }
}
