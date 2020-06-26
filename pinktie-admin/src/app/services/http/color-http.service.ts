import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Color} from "../../model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SearchParams, SearchParamsBuilder} from "./http-resource.service";

@Injectable({
  providedIn: 'root'
})
export class ColorHttpService {

  private baseUrl = `${environment.api.url}/colors`;

  constructor(
    private http: HttpClient
  ) { }

  create(data: Color): Observable<Color> {
    return this.http.post<{ data: Color }>(this.baseUrl, data)
      .pipe(map(response => response.data));
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  get(id: number): Observable<Color> {
    return this.http.get<{ data: Color }>(`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  list(searchParams: SearchParams): Observable<{ data: Array<Color>; meta: any }> {
    const params = new HttpParams({
      fromObject: new SearchParamsBuilder(searchParams).makeObject()
    });
    return this.http.get<{ data: Array<Color>, meta: any }>(this.baseUrl, {
      params
    });
  }

  update(id: number, data: Color): Observable<Color> {
    return this.http.put<{ data: Color }>(`${this.baseUrl}/${id}`, data)
      .pipe(map(response => response.data));
  }
}
