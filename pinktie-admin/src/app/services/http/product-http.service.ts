import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../../model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource.service";

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product>{

  private baseUrl = `${environment.api.url}/products`;

  constructor(
    private http: HttpClient
  ) { }

  create(data: Product): Observable<Product> {
    return this.http.post<{ data: Product }>(this.baseUrl, data)
      .pipe(map(response => response.data));
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  get(id: number): Observable<Product> {
    return this.http.get<{ data: Product }>(`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  list(searchParams: SearchParams): Observable<{ data: Array<Product>; meta: any }> {
    const params = new HttpParams({
      fromObject: new SearchParamsBuilder(searchParams).makeObject()
    });
    return this.http.get<{ data: Array<Product>, meta: any }>(this.baseUrl, {
      params
    });
  }

  update(id: number, data: Product): Observable<Product> {
    return this.http.put<{ data: Product }>(`${this.baseUrl}/${id}`, data)
      .pipe(map(response => response.data));
  }
}
