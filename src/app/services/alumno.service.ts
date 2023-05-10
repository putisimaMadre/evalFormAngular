import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Alumno } from '../models/alumno';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
urlEndPoint = 'http://127.0.0.1:8000/api/alumnos'
private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private httpClient: HttpClient) { }

  getAlumnos(): Observable<Alumno[]>{
    return this.httpClient.get<Alumno[]>(this.urlEndPoint)
  }

  saveAlumno(alumno: Alumno): Observable<Alumno>{
    return this.httpClient.post<Alumno>(this.urlEndPoint, alumno, {headers: this.httpHeaders}).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
        console.log(this.RequiredRefresh.next())
      })
    );
  }

  getAlumno(id: any): Observable<Alumno>{
    return this.httpClient.get<Alumno>(this.urlEndPoint+'/'+id)
  }

  // GetEmployeebycode(code:any){
  //   return this.http.get(this.apiurl+'/'+code);
  // }

  updateAlumno(alumno: Alumno): Observable<Alumno>{
    return this.httpClient.put<Alumno>(this.urlEndPoint+'/'+alumno.id, alumno, {headers:this.httpHeaders})
  }
}