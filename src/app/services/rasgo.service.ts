import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Rasgo } from '../models/rasgo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RasgoService {
  urlEndPoint = 'http://127.0.0.1:8000/api/rasgo'
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private httpClient: HttpClient) { }

  getRasgos(): Observable<Rasgo[]>{
    return this.httpClient.get<Rasgo[]>(this.urlEndPoint)
  }

  saveRasgo(rasgo: Rasgo): Observable<Rasgo>{
    console.log(rasgo)
    return this.httpClient.post<Rasgo>(this.urlEndPoint, rasgo, {headers: this.httpHeaders})
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  getRasgo(id: any): Observable<Rasgo>{
    return this.httpClient.get<Rasgo>(this.urlEndPoint+'/'+id)
  }

  updateRasgo(rasgo: Rasgo): Observable<Rasgo>{
    return this.httpClient.put<Rasgo>(this.urlEndPoint+'/'+rasgo.id, rasgo, {headers:this.httpHeaders})
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  deleteRasgo(id: any): Observable<Rasgo>{
    return this.httpClient.delete<Rasgo>(this.urlEndPoint+'/'+id)
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }
}
