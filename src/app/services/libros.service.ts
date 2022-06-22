import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libros } from '../models/libros';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'http://pav2.azurewebsites.net/api/libros';
  }
  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj: Libros) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }
  put(Id: number, obj: any) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }
}
