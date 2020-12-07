import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from '../models/bugs.model';

@Injectable({
  providedIn: 'root'
})
export class BugsService {

  private readonly endpoint: string = 'https://bug-report-system-server.herokuapp.com/bugs'

  constructor(private http: HttpClient) { }

  getBugs(): Observable<Bugs[]> {
    return this.http.get<Bugs[]>(this.endpoint);
  }

  getBugsSorted(value:string, order:string){
    return this.http.get<Bugs[]>(`${this.endpoint}?sort=${value},${order}`)
  }

  getAllBugs(order:boolean, filter = "title") : Observable<Bugs[]>{
    let query = this.endpoint + "?sort="+filter+","
                + (order ? "asc": "desc");
    return this.http.get<Bugs[]>(query)
  }
}