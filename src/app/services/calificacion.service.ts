import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Calificacion } from '../models/calificacion';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  urlEndPoint = 'http://127.0.0.1:8000/api/calificacion'
  urlEndPointConsultarDatos = 'http://127.0.0.1:8000/api/consultarDatos'
  //urlEndPoint = 'http://sistemas-integrales-fw.com/evaluacionFormativa/public/api/calificacion'
  //urlEndPointConsultarDatos = 'http://sistemas-integrales-fw.com/evaluacionFormativa/public/api/consultarDatos'
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private httpClient: HttpClient) { }

  getCalificaciones(): Observable<Calificacion[]>{
    return this.httpClient.get<Calificacion[]>(this.urlEndPoint)
  }

  consultarDatos(calificacion: Calificacion): Observable<Calificacion[]>{
    return this.httpClient.post<Calificacion[]>(this.urlEndPointConsultarDatos, calificacion, {headers: this.httpHeaders})
    
  }

  saveCalificacion(calificacion: any): Observable<any>{
    return this.httpClient.post<any>(this.urlEndPoint, calificacion, {headers: this.httpHeaders})
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  getCalificacion(id: number): Observable<any>{
    return this.httpClient.get<any>(this.urlEndPoint+'/'+id)
  }

  updateCalificacion(calificacion: Calificacion): Observable<Calificacion>{
    return this.httpClient.put<Calificacion>(this.urlEndPoint+'/'+calificacion.id, calificacion, {headers:this.httpHeaders})
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }


  deleteCalificacion(id: any): Observable<Calificacion>{
    return this.httpClient.delete<Calificacion>(this.urlEndPoint+'/'+id)
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }
}
