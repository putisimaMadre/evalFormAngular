import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Calificacion } from 'src/app/models/calificacion';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private serviceUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Calificacion[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<Calificacion[]>(map((data: any) => data.users));
  }

  updateUser(user: Calificacion): Observable<Calificacion> {
    return this.http.patch<Calificacion>(`${this.serviceUrl}/${user.id}`, user);
  }

  addUser(user: Calificacion): Observable<Calificacion> {
    return this.http.post<Calificacion>(`${this.serviceUrl}/add`, user);
  }

  deleteUser(id: number): Observable<Calificacion> {
    return this.http.delete<Calificacion>(`${this.serviceUrl}/${id}`);
  }

  deleteUsers(users: Calificacion[]): Observable<Calificacion[]> {
    return forkJoin(
      users.map((user) =>
        this.http.delete<Calificacion>(`${this.serviceUrl}/${user.id}`)
      )
    );
  }
}
