import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Bugs } from '../models/bugs.model';

@Injectable({
  providedIn: 'root'
})
export class BugsService {

  private readonly endpoint: string = 'https://bug-report-system-server.herokuapp.com/bugs'

  constructor(private http: HttpClient) { }

  getBugsAll(): Observable<Bugs[]> {
    return this.http.get<Bugs[]>(this.endpoint);
  }

  getBugsSorted(value:string, order:string){
    return this.http.get<Bugs[]>(`${this.endpoint}?sort=${value},${order}`)
  }

  getBugs(order:boolean, filter = "title") : Observable<Bugs[]>{
    let query = this.endpoint + "?sort="+filter+","
                + (order ? "asc": "desc");
    return this.http.get<Bugs[]>(query)
  }

  deleteBug(id:string){
    // console.log(this.endpoint+'/'+id)
    return this.http.delete(`${this.endpoint}/${id}`)
  }

  postBug(form: FormGroup){
    return this.http.post(this.endpoint, form)
  }
}