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
import { ProductListComponent } from './components/pages/product/product-list/product-list.component';
import { ProductEditModalComponent } from './components/pages/product/product-edit-modal/product-edit-modal.component';
import { ProductNewModalComponent } from './components/pages/product/product-new-modal/product-new-modal.component';
import { ProductDeleteModalComponent } from './components/pages/product/product-delete-modal/product-delete-modal.component';
import { ProductSearchFormComponent } from './components/pages/product/product-search-form/product-search-form.component';
import { ProductFormComponent } from './components/pages/product/product-form/product-form.component';
import { ProductViewModalComponent } from './components/pages/product/product-view-modal/product-view-modal.component';
import { NumberFormatBrPipe } from './pipes/number-format-br.pipe';
import {Select2Module} from "ng2-select2";
import { ColorDeleteModalComponent } from './components/pages/color/color-delete-modal/color-delete-modal.component';
import { ColorEditModalComponent } from './components/pages/color/color-edit-modal/color-edit-modal.component';
import { ColorNewModalComponent } from './components/pages/color/color-new-modal/color-new-modal.component';
import { ColorListComponent } from './components/pages/color/color-list/color-list.component';
import { ColorFormComponent } from './components/pages/color/color-form/color-form.component';
import { ColorSearchFormComponent } from './components/pages/color/color-search-form/color-search-form.component';
import { MaterialDeleteModalComponent } from './components/pages/material/material-delete-modal/material-delete-modal.component';
import { MaterialEditModalComponent } from './components/pages/material/material-edit-modal/material-edit-modal.component';
import { MaterialNewModalComponent } from './components/pages/material/material-new-modal/material-new-modal.component';
import { MaterialListComponent } from './components/pages/material/material-list/material-list.component';
import { MaterialFormComponent } from './components/pages/material/material-form/material-form.component';
import { MaterialSearchFormComponent } from './components/pages/material/material-search-form/material-search-form.component';
import { ProductColorListComponent } from './components/pages/product-color/product-color-list/product-color-list.component';
import { ProductColorNewModalComponent } from './components/pages/product-color/product-color-new-modal/product-color-new-modal.component';
import { ProductMaterialListComponent } from './components/pages/product-material/product-material-list/product-material-list.component';
import { ProductMaterialNewModalComponent } from './components/pages/product-material/product-material-new-modal/product-material-new-modal.component';
import { ProductPhotoEditModalComponent } from './components/pages/product-photo/product-photo-edit-modal/product-photo-edit-modal.component';
import { ProductPhotoUploadComponent } from './components/pages/product-photo/product-photo-upload/product-photo-upload.component';
import { ProductPhotoManagerComponent } from './components/pages/product-photo/product-photo-manager/product-photo-manager.component';
import { ProductPhotoDeleteModalComponent } from './components/pages/product-photo/product-photo-delete-modal/product-photo-delete-modal.component';

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
    SortColumnComponent,
    ProductListComponent,
    ProductEditModalComponent,
    ProductNewModalComponent,
    ProductDeleteModalComponent,
    ProductSearchFormComponent,
    ProductFormComponent,
    ProductViewModalComponent,
    NumberFormatBrPipe,
    ColorDeleteModalComponent,
    ColorEditModalComponent,
    ColorNewModalComponent,
    ColorListComponent,
    ColorFormComponent,
    ColorSearchFormComponent,
    MaterialDeleteModalComponent,
    MaterialEditModalComponent,
    MaterialNewModalComponent,
    MaterialListComponent,
    MaterialFormComponent,
    MaterialSearchFormComponent,
    ProductColorListComponent,
    ProductColorNewModalComponent,
    ProductMaterialListComponent,
    ProductMaterialNewModalComponent,
    ProductPhotoEditModalComponent,
    ProductPhotoUploadComponent,
    ProductPhotoManagerComponent,
    ProductPhotoDeleteModalComponent
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
        NgxPaginationModule,
        Select2Module
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
