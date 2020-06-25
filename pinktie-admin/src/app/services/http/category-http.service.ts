import { Injectable } from '@angular/core';
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource.service";
import {Category} from "../../model";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService implements HttpResource<Category> {

  private baseUrl = `${environment.api.url}/categories`;

  constructor(
    private http: HttpClient
  ) { }

  create(data: Category): Observable<Category> {
    return this.http.post<{ data: Category }>(this.baseUrl, data)
      .pipe(map(response => response.data));
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  get(id: number): Observable<Category> {
    return this.http.get<{ data: Category }>(`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  list(searchParams: SearchParams): Observable<{ data: Array<Category>; meta: any }> {
    const params = new HttpParams({
      fromObject: new SearchParamsBuilder(searchParams).makeObject()
    });
    return this.http.get<{ data: Array<Category>, meta: any }>(this.baseUrl, {
      params
    });
  }

  update(id: number, data: Category): Observable<Category> {
    return this.http.put<{ data: Category }>(`${this.baseUrl}/${id}`, data)
      .pipe(map(response => response.data));
  }
}
