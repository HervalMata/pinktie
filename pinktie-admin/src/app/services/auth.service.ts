import { Injectable } from '@angular/core';
import {User} from "../model";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

const TOKEY_KEY = 'lacos_da_cris_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  me: User = null;

  constructor(private http: HttpClient) {
    const token = this.getToken();
    this.setUserFromToken(token);
  }

  login(user: { email: string, password: string}) : Observable<{ token: string }> {
    return this.http.post<{ token: string}>(`${environment.api.url}/login`, user)
      .pipe(
        tap(response => {
          this.setToken(response.token);
        })
      );
  }

  getToken() : string| null {
    return window.localStorage.getItem(TOKEY_KEY);
  }

  private setUserFromToken(token: string) {
    const decodedToken = new JwtHelperService().decodeToken(token);
    this.me = decodedToken ? {
      id: decodedToken.sub,
      name: decodedToken.name,
      email: decodedToken.email,
      profile: decodedToken.profile
    } : null
  }

  setToken(token: string) {
    this.setUserFromToken(token);
    token ? window.localStorage.setItem(TOKEY_KEY, token) : window.localStorage.removeItem(TOKEY_KEY);
  }

  isAuth() : boolean {
    const token = this.getToken();
    return !new JwtHelperService().isTokenExpired(token, 30);
  }

  logout() : Observable<any> {
    return this.http.post<{ token: string}>(`${environment.api.url}/logout`, {})
      .pipe(
        tap(() => {
          this.setToken(null);
        })
      );
  }

  get authorizationHeader() {
    return `Bearer ${this.getToken()}`;
  }
}
