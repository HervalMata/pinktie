import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Color, ProductColor} from "../../../../model";
import {ProductColorHttpService} from "../../../../services/http/product-color-http.service";
import {ColorHttpService} from "../../../../services/http/color-http.service";

@Component({
  selector: 'product-color-new-modal',
  templateUrl: './product-color-new-modal.component.html',
  styleUrls: ['./product-color-new-modal.component.css']
})
export class ProductColorNewModalComponent implements OnInit {

  colors: Color[] = [];
  colorsId: number[] = [];

  @Input()
  productId: number;

  @Input()
  productColor: ProductColor = null;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private productColorHttp: ProductColorHttpService,
    private colorHttp: ColorHttpService
  ) {
  }

  ngOnInit() {
    this.getColors();
  }

  submit() {
    const colorsId = this.mergeColors();
    this.productColorHttp.create(this.productId, colorsId)
      .subscribe((productColor) =>
        this.onSuccess.emit(productColor),
          error => this.onError.emit(error));
    return false;
  }

  change($event) {
    console.log(this.colorsId);
  }

  getColors() {
    this.colorHttp.list({all: 1})
      .subscribe(response => {
        console.log(response);
        this.colors = response.data;
      })
  }

  private mergeColors() : number[] {
    const colorsId = this.productColor.colors.map(color => color.id);
    const newColorsId = this.colorsId.filter((color) => {
      return colorsId.indexOf(color) == -1;
    });
    return colorsId.concat(newColorsId);
  }
}
