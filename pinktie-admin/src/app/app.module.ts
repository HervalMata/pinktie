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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CategoryDeleteModalComponent } from './components/pages/category/category-delete-modal/category-delete-modal.component';
import { CategoryEditModalComponent } from './components/pages/category/category-edit-modal/category-edit-modal.component';
import { CategoryNewModalComponent } from './components/pages/category/category-new-modal/category-new-modal.component';
import { CategoryFormComponent } from './components/pages/category/category-form/category-form.component';
import { CategoryListComponent } from './components/pages/category/category-list/category-list.component';
import { CategorySearchFormComponent } from './components/pages/category/category-search-form/category-search-form.component';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { CardErrorComponent } from './components/bootstrap/card-error/card-error.component';
import { ListErrorComponent } from './components/bootstrap/list-error/list-error.component';
import { FieldErrorComponent } from './components/bootstrap/field-error/field-error.component';
import { IsInvalidDirective } from './directives/is-invalid.directive';
import {NgxPaginationModule} from "ngx-pagination";
import { SortColumnComponent } from './components/common/sort-column/sort-column.component';

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
    NavbarComponent,
    CategoryDeleteModalComponent,
    CategoryEditModalComponent,
    CategoryNewModalComponent,
    CategoryFormComponent,
    CategoryListComponent,
    CategorySearchFormComponent,
    ModalComponent,
    CardErrorComponent,
    ListErrorComponent,
    FieldErrorComponent,
    IsInvalidDirective,
    SortColumnComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthService]
      }
    }),
    NgxPaginationModule
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
