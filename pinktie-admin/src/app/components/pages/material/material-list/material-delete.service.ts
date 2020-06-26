import { Injectable } from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MaterialListComponent} from "./material-list.component";

@Injectable({
  providedIn: 'root'
})
export class MaterialDeleteService {

  private _materialListComponent: MaterialListComponent;

  constructor(private notifyMessage: NotifyMessageService) { }

  set materialListComponent(value: MaterialListComponent) {
    this._materialListComponent = value;
  }

  showModalDelete(materialId: number) {
    this._materialListComponent.materialId = materialId;
    this._materialListComponent.materialDeleteModal.showModal();
  }

  onDeleteSuccess($event: any) {
    this.notifyMessage.success('Material removido com sucesso!');
    console.log($event);
    this._materialListComponent.getMaterials();
  }

  onDeleteError($event: HttpErrorResponse) {
    this.notifyMessage.success('Não foi possível remover o material.');
    console.log($event);
  }
}
