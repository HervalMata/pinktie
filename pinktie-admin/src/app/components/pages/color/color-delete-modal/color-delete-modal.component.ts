import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Color} from "../../../../model";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ColorHttpService} from "../../../../services/http/color-http.service";

@Component({
  selector: 'color-delete-modal',
  templateUrl: './color-delete-modal.component.html',
  styleUrls: ['./color-delete-modal.component.css']
})
export class ColorDeleteModalComponent implements OnInit {

  @Input()
  color: Color = null;

  @Input()
  _colorId: number;

  @ViewChild(ModalComponent) modal:ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private colorHttp: ColorHttpService
  ) {
  }

  ngOnInit() {
  }

  destroy() {
    this.colorHttp.destroy(this._colorId)
      .subscribe((color) => {
        this.onSuccess.emit(color);
        this.modal.hide();
      }, error => this.onError.emit(error));
  }

  @Input()
  set colorId(value) {
    this._colorId = value;
    if (this._colorId) {
      this.colorHttp.get(this._colorId)
        .subscribe(color => this.color = color);
    }
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    console.log($event);
  }

}
