import { Injectable } from '@angular/core';
import { Products } from '../models/common.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/products'

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Products[]> {
    return this.http.get<Products[]>(baseUrl);
  }

  get(id: any): Observable<Products> {
    return this.http.get(`${baseUrl}/${id}`)
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
