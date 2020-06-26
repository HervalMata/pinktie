import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Material} from "../../../../model";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {MaterialHttpService} from "../../../../services/http/material-http.service";

@Component({
  selector: 'material-delete-modal',
  templateUrl: './material-delete-modal.component.html',
  styleUrls: ['./material-delete-modal.component.css']
})
export class MaterialDeleteModalComponent implements OnInit {

  @Input()
  material: Material = null;

  @Input()
  _materialId: number;

  @ViewChild(ModalComponent) modal:ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private materialHttp: MaterialHttpService
  ) {
  }

  ngOnInit() {
  }

  destroy() {
    this.materialHttp.destroy(this._materialId)
      .subscribe((material) => {
        this.onSuccess.emit(material);
        this.modal.hide();
      }, error => this.onError.emit(error));
  }

  @Input()
  set materialId(value) {
    this._materialId = value;
    if (this._materialId) {
      this.materialHttp.get(this._materialId)
        .subscribe(material => this.material = material);
    }
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    console.log($event);
  }

}
