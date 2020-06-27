import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductMaterial} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductMaterialHttpService {

  private baseApi = `${environment.api.url}`;
  private token = window.localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  list(productId: number) : Observable<ProductMaterial> {
    return this.http.get<{data: ProductMaterial}>(this.getBaseUrl(productId), {headers: {
        'Authorization': `Bearer ${this.token}`
      }}).pipe(map(response => response.data));
  }

  create(productId: number, materialsId: number[]) : Observable<ProductMaterial> {
    return this.http.post<{data: ProductMaterial}>(this.getBaseUrl(productId), {materials: materialsId}, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }}).pipe(map(response => response.data));
  }

  private getBaseUrl(productId: number, materialId: number = null) : string {
    let baseUrl = `${this.baseApi}/products/${productId}/materials`;
    if (materialId) {
      baseUrl == `/${materialId}`;
    }
    return baseUrl;
  }
}
