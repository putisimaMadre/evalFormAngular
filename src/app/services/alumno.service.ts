import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
urlEndPoint = 'http://127.0.0.1:8000/api/alumnos'
  constructor(private httpClient: HttpClient) { }

  getAlumnos(): Observable<Alumno[]>{
    return this.httpClient.get<Alumno[]>(this.urlEndPoint)
  }
}