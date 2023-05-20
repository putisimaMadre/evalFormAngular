import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Actividad } from '../models/actividad';
import { Alumno } from '../models/alumno';
import { Asignatura } from '../models/asignatura';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  //urlEndPoint = 'http://127.0.0.1:8000/api/actividad'
  urlEndPoint = 'http://sistemas-integrales-fw.com/evaluacionFormativa/public/api/actividad'
  //le falta el turno
  urlEndPointGradoGrupoTurno = 'http://127.0.0.1:8000/api/busquedaGradoGrupoTurno'
  //urlEndPointGradoGrupoTurno = 'http://sistemas-integrales-fw.com/evaluacionFormativa/public/api/busquedaGradoGrupoTurno'
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private httpClient: HttpClient) { }

  getActividades(): Observable<Actividad[]>{
    return this.httpClient.get<Actividad[]>(this.urlEndPoint)
  }

  getGradoGrupoTurno(actividad: any): Observable<Alumno[]>{
    return this.httpClient.post<Alumno[]>(this.urlEndPointGradoGrupoTurno, actividad, {headers: this.httpHeaders})
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
