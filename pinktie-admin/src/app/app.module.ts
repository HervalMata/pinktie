import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/pages/login/login.component';
import { AlertErrorComponent } from './components/bootstrap/alert-error/alert-error.component';
import {NavbarComponent} from "./components/bootstrap/navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";
import {RefreshTokenInterceptorService} from "./services/refresh-token-interceptor.service";
import {FormsModule} from "@angular/forms";

function jwtFactory(authService: AuthService) {
  return {
    whitelistedDomains: [
      new RegExp('localhost:8000/*')
    ],
    tokenGetter: () => {
      return authService.getToken()
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertErrorComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthService]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
