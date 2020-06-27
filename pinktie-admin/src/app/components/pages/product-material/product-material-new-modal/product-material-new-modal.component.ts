import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Material, ProductMaterial} from "../../../../model";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductMaterialHttpService} from "../../../../services/http/product-material-http.service";
import {MaterialHttpService} from "../../../../services/http/material-http.service";

@Component({
  selector: 'product-material-new-modal',
  templateUrl: './product-material-new-modal.component.html',
  styleUrls: ['./product-material-new-modal.component.css']
})
export class ProductMaterialNewModalComponent implements OnInit {

  materials: Material[] = [];
  materialsId: number[] = [];

  @Input()
  productId: number;

  @Input()
  productMaterial: ProductMaterial = null;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private productMaterialHttp: ProductMaterialHttpService,
    private materialHttp: MaterialHttpService
  ) {
  }

  ngOnInit() {
    this.getMaterials();
  }

  submit() {
    const materialsId = this.mergeMaterials();
    this.productMaterialHttp.create(this.productId, materialsId)
      .subscribe((productMaterial) =>
          this.onSuccess.emit(productMaterial),
        error => this.onError.emit(error));
    return false;
  }

  change($event) {
    console.log(this.materialsId);
  }

  getMaterials() {
    this.materialHttp.list({all: 1})
      .subscribe(response => {
        console.log(response);
        this.materials = response.data;
      })
  }

  private mergeMaterials() : number[] {
    const materialsId = this.productMaterial.materials.map(material => material.id);
    const newMaterialsId = this.materialsId.filter((material) => {
      return materialsId.indexOf(material) == -1;
    });
    return materialsId.concat(newMaterialsId);
  }

}
