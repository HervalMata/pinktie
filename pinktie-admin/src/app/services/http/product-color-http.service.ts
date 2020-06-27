import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductColor} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductColorHttpService {

  private baseApi = `${environment.api.url}`;
  private token = window.localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  list(productId: number) : Observable<ProductColor> {
    return this.http.get<{data: ProductColor}>(this.getBaseUrl(productId), {headers: {
      'Authorization': `Bearer ${this.token}`
      }}).pipe(map(response => response.data));
  }

  create(productId: number, colorsId: number[]) : Observable<ProductColor> {
    return this.http.post<{data: ProductColor}>(this.getBaseUrl(productId), {colors: colorsId}, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }}).pipe(map(response => response.data));
  }

  private getBaseUrl(productId: number, colorId: number = null) : string {
    let baseUrl = `${this.baseApi}/products/${productId}/colors`;
    if (colorId) {
      baseUrl == `/${colorId}`;
    }
    return baseUrl;
  }
}
