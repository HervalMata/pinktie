import { Injectable } from '@angular/core';
import {Material} from "../../model";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SearchParams, SearchParamsBuilder} from "./http-resource.service";

@Injectable({
  providedIn: 'root'
})
export class MaterialHttpService {

  private baseUrl = `${environment.api.url}/materials`;

  constructor(
    private http: HttpClient
  ) { }

  create(data: Material): Observable<Material> {
    return this.http.post<{ data: Material }>(this.baseUrl, data)
      .pipe(map(response => response.data));
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  get(id: number): Observable<Material> {
    return this.http.get<{ data: Material }>(`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  list(searchParams: SearchParams): Observable<{ data: Array<Material>; meta: any }> {
    const params = new HttpParams({
      fromObject: new SearchParamsBuilder(searchParams).makeObject()
    });
    return this.http.get<{ data: Array<Material>, meta: any }>(this.baseUrl, {
      params
    });
  }

  update(id: number, data: Material): Observable<Material> {
    return this.http.put<{ data: Material }>(`${this.baseUrl}/${id}`, data)
      .pipe(map(response => response.data));
  }
}
