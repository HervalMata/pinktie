import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../../model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource.service";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService implements HttpResource<User> {

  private baseUrl = `${environment.api.url}/users`;

  constructor(
    private http: HttpClient
  ) { }

  create(data: User): Observable<User> {
    return this.http.post<{ data: User }>(this.baseUrl, data)
      .pipe(map(response => response.data));
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  get(id: number): Observable<User> {
    return this.http.get<{ data: User }>(`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  list(searchParams: SearchParams): Observable<{ data: Array<User>; meta: any }> {
    const params = new HttpParams({
      fromObject: new SearchParamsBuilder(searchParams).makeObject()
    });
    return this.http.get<{ data: Array<User>, meta: any }>(this.baseUrl, {
      params
    });
  }

  update(id: number, data: User): Observable<User> {
    return this.http.put<{ data: User }>(`${this.baseUrl}/${id}`, data)
      .pipe(map(response => response.data));
  }
}
