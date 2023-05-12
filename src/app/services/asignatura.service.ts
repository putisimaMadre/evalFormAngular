import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Asignatura } from '../models/asignatura';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  urlEndPoint = 'http://127.0.0.1:8000/api/asignatura'
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private httpClient: HttpClient) { }

  getAsignaturas(): Observable<Asignatura[]>{
    return this.httpClient.get<Asignatura[]>(this.urlEndPoint)
  }

  saveAsignatura(asignatura: Asignatura): Observable<Asignatura>{
    console.log(asignatura)
    return this.httpClient.post<Asignatura>(this.urlEndPoint, asignatura, {headers: this.httpHeaders})
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  getAsignatura(id: any): Observable<Asignatura>{
    return this.httpClient.get<Asignatura>(this.urlEndPoint+'/'+id)
  }

  // GetEmployeebycode(code:any){
  //   return this.http.get(this.apiurl+'/'+code);
  // }

  updateAsignatura(asignatura: Asignatura): Observable<Asignatura>{
    return this.httpClient.put<Asignatura>(this.urlEndPoint+'/'+asignatura.id, asignatura, {headers:this.httpHeaders})
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  deleteAsignatura(id: any): Observable<Asignatura>{
    return this.httpClient.delete<Asignatura>(this.urlEndPoint+'/'+id)
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }
}
