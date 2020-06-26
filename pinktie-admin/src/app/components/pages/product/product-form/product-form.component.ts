import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldsOptions from "./product-fields-options";
import {Select2Component} from "ng2-select2";
import {CategoryIdFieldService} from "./category-id-field.service";

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input()
  form: FormGroup;

  @ViewChild(Select2Component, {read: ElementRef})
  select2Element: ElementRef;

  constructor(
    private changeRef: ChangeDetectorRef,
    public categoryIdField: CategoryIdFieldService
    ) { }

  ngOnInit() {
    this.categoryIdField.make(this.select2Element, this.form.get('category_id'));
  }

  ngOnChanges() {
    this.changeRef.detectChanges();
  }

  get fieldsOptions() : any {
    return fieldsOptions;
  }

}
