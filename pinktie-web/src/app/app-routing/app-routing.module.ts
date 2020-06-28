import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from "../components/pages/shop/product-list/product-list.component";

const routes: Routes = [
  {path: 'shop/list', component: ProductListComponent},
  {path: '', redirectTo: '/shop/list', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
