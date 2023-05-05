import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
urlEndPoint = 'http://127.0.0.1:8000/api/alumnos'
private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private httpClient: HttpClient) { }

  getAlumnos(): Observable<Alumno[]>{
    return this.httpClient.get<Alumno[]>(this.urlEndPoint)
  }

  saveAlumno(alumno: Alumno): Observable<Alumno>{
    return this.httpClient.post<Alumno>(this.urlEndPoint, alumno, {headers: this.httpHeaders})
  }

  getAlumno(): Observable<Alumno>{
    return this.httpClient.get<Alumno>('this.urlEndPoint/{alumno.id}')
  }

  updateAlumno(alumno: Alumno): Observable<Alumno>{
    return this.httpClient.put<Alumno>('this.urlEndPoint/{alumno.id}', alumno, {headers:this.httpHeaders})
  }
}