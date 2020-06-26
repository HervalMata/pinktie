import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ColorHttpService} from "../../../../services/http/color-http.service";

@Component({
  selector: 'color-edit-modal',
  templateUrl: './color-edit-modal.component.html',
  styleUrls: ['./color-edit-modal.component.css']
})
export class ColorEditModalComponent implements OnInit {

  form: FormGroup;
  errors: {};

  @Input()
  _colorId: number;

  @ViewChild(ModalComponent) modal:ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private colorHttp: ColorHttpService,
    private formBuilder: FormBuilder
  ) {
    //const maxLength = fieldsOptions.color_name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      color_name: '',
      active: true
    });
  }

  ngOnInit() {
  }

  submit() {
    this.colorHttp.update(this._colorId, this.form.value)
      .subscribe((color) => {
        this.onSuccess.emit(color);
        this.modal.hide();
      }, responseError => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors
        }
        this.onError.emit(responseError)
      });
  }

  @Input()
  set colorId(value) {
    this._colorId = value;
    if (this._colorId) {
      this.colorHttp.get(this._colorId)
        .subscribe(color => this.form.patchValue(color),
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
