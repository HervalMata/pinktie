import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {MaterialHttpService} from "../../../../services/http/material-http.service";

@Component({
  selector: 'material-edit-modal',
  templateUrl: './material-edit-modal.component.html',
  styleUrls: ['./material-edit-modal.component.css']
})
export class MaterialEditModalComponent implements OnInit {

  form: FormGroup;
  errors: {};

  @Input()
  _materialId: number;

  @ViewChild(ModalComponent) modal:ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private materialHttp: MaterialHttpService,
    private formBuilder: FormBuilder
  ) {
    //const maxLength = fieldsOptions.material_name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      material_name: '',
      active: true
    });
  }

  ngOnInit() {
  }

  submit() {
    this.materialHttp.update(this._materialId, this.form.value)
      .subscribe((material) => {
        this.onSuccess.emit(material);
        this.modal.hide();
      }, responseError => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors
        }
        this.onError.emit(responseError)
      });
  }

  @Input()
  set materialId(value) {
    this._materialId = value;
    if (this._materialId) {
      this.materialHttp.get(this._materialId)
        .subscribe(material => this.form.patchValue(material),
          responseError => {
            if (responseError.status === 401) {
              this.modal.hide();
            }
          })
    }
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    console.log($event);
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }

}
