import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../components/pages/login/login.component";
import {CategoryListComponent} from "../components/pages/category/category-list/category-list.component";
import {AuthGuard} from "../guards/auth.guard";
import {ProductListComponent} from "../components/pages/product/product-list/product-list.component";
import {ColorListComponent} from "../components/pages/color/color-list/color-list.component";
import {MaterialListComponent} from "../components/pages/material/material-list/material-list.component";
import {ProductColorListComponent} from "../components/pages/product-color/product-color-list/product-color-list.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'categories/list', component: CategoryListComponent, canActivate: [AuthGuard]},
  {path: 'products/list', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'colors/list', component: ColorListComponent, canActivate: [AuthGuard]},
  {path: 'materials/list', component: MaterialListComponent, canActivate: [AuthGuard]},
  {path: 'products/:product/colors/list', component: ProductColorListComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  declarations: [],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
