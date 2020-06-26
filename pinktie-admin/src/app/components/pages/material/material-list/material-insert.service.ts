import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MaterialListComponent} from "./material-list.component";

@Injectable({
  providedIn: 'root'
})
export class MaterialInsertService {

  private _materialListComponent: MaterialListComponent;

  constructor(private notifyMessage: NotifyMessageService) { }

  set materialListComponent(value: MaterialListComponent) {
    this._materialListComponent = value;
  }

  showModalInsert() {
    this._materialListComponent.materialNewModal.showModal();
  }

  onInsertSuccess($event: any) {
    this.notifyMessage.success('Material cadastrado com sucesso!');
    console.log($event);
    this._materialListComponent.getMaterials();
  }

  onInsertError($event: HttpErrorResponse) {
    this.notifyMessage.success('Não foi possível cadastrar o material.');
    console.log($event);
  }
}
