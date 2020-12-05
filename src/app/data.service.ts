import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bugs } from './bugs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private endpoint = 'https://bug-report-system-server.herokuapp.com/bugs'

  constructor(private http:HttpClient) {}

  getAllBugs( filter:string, order:boolean) : Observable<Bugs[]>{
    let query = this.endpoint + "?sort="+filter+","
                + (order ? "asc": "desc");
    return this.http.get<Bugs[]>(query)
  }
}