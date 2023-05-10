import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject,tap } from 'rxjs';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiurl = 'https://localhost:44308/Employee';

  private _refreshrequired=new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private http: HttpClient) {

  }
  GetEmployee(): Observable<Employee> {
    return this.http.get<Employee>(this.apiurl);
  }
  GetEmployeebycode(code:any){
    return this.http.get(this.apiurl+'/'+code);
  }
  Remove(code:any){
    return this.http.delete(this.apiurl+'/'+code);
  }
  Save(inputdata:any){
    return this.http.post(this.apiurl,inputdata).pipe(
      tap(()=>{
this.RequiredRefresh.next();
      })
    );
  }

  GetDes(){
    return this.http.get('http://127.0.0.1:8000/api/alumnos');
  }
}
