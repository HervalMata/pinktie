import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../model";

@Injectable({
  providedIn: 'root'
})
export class ShopHttpService {

  private baseUrl = `${environment.api.url}/shop`;

  constructor(private http: HttpClient) { }

  list() : Observable<{ data: Array<Product> }> {
    return this.http.get<{ data: Array<Product> }>(this.baseUrl)
  }

  list1() : Observable<{ data: Array<Product> }> {
    return this.http.get<{ data: Array<Product> }>(`${this.baseUrl}/1`)
  }

  list2() : Observable<{ data: Array<Product> }> {
    return this.http.get<{ data: Array<Product> }>(`${this.baseUrl}/2`)
  }
}
