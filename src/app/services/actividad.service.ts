import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Actividad } from '../models/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  urlEndPoint = 'http://127.0.0.1:8000/api/actividad'
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private httpClient: HttpClient) { }

  getActividades(): Observable<Actividad[]>{
    return this.httpClient.get<Actividad[]>(this.urlEndPoint)
  }

  saveActividad(actividad: Actividad): Observable<Actividad>{
    console.log(actividad)
    return this.httpClient.post<Actividad>(this.urlEndPoint, actividad, {headers: this.httpHeaders})
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  getActividad(id: any): Observable<Actividad>{
    return this.httpClient.get<Actividad>(this.urlEndPoint+'/'+id)
  }

  updateActividad(actividad: Actividad): Observable<Actividad>{
    return this.httpClient.put<Actividad>(this.urlEndPoint+'/'+actividad.id, actividad, {headers:this.httpHeaders})
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  deleteActividad(id: any): Observable<Actividad>{
    return this.httpClient.delete<Actividad>(this.urlEndPoint+'/'+id)
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }
}
