import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  endpoint = 'https://bug-report-system-server.herokuapp.com/'

  constructor(private http:HttpClient) { }

  getBugs():Observable<any>{
    return this.http.get(this.endpoint+ "bugs")
  }
  
  sortBy( value:string, order:string):Observable<any>{
    return this.http.get(this.endpoint+ "bugs?sort="+value+","+order);
  }
  
  

}
