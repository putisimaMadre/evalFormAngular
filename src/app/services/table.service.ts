import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {
urlEndPoint = "http://127.0.0.1:8000/api/clientes"
  constructor(private httpClient: HttpClient) { }

  clientes(): Observable<Table[]>{
    return this.httpClient.get<Table[]>(this.urlEndPoint)
  }
}
