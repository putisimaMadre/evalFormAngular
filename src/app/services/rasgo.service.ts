import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Rasgo } from '../models/rasgo';
import { Grafico } from '../models/grafico';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RasgoService {
  //urlEndPoint = 'http://127.0.0.1:8000/api/rasgo'
  //urlEndPointResumen = 'http://127.0.0.1:8000/api/rasgoResumen'
  //urlEndPointGrafico = 'http://127.0.0.1:8000/api/getGrafico'
  urlEndPoint = 'http://sistemas-integrales-fw.com/evaluacionFormativa/public/api/rasgo'
  urlEndPointResumen = 'http://sistemas-integrales-fw.com/evaluacionFormativa/public/api/rasgoResumen'
  urlEndPointGrafico = 'http://sistemas-integrales-fw.com/evaluacionFormativa/public/api/getGrafico'
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private httpClient: HttpClient) { }

  getRasgos(): Observable<Rasgo[]>{
    return this.httpClient.get<Rasgo[]>(this.urlEndPoint)
  }

  getResumen(rasgo: Rasgo): Observable<Rasgo>{
    return this.httpClient.post<Rasgo>(this.urlEndPointResumen, rasgo, {headers: this.httpHeaders})
  }

  getGrafico(valores: Rasgo): Observable<Grafico[]>{
    return this.httpClient.post<Grafico[]>(this.urlEndPointGrafico, valores, {headers: this.httpHeaders})
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
