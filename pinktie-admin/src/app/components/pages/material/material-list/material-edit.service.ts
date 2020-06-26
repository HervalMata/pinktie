import { Injectable } from '@angular/core';
import {CategoryListComponent} from "../../category/category-list/category-list.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MaterialListComponent} from "./material-list.component";

@Injectable({
  providedIn: 'root'
})
export class MaterialEditService {

  private _materialListComponent: MaterialListComponent;

  constructor(private notifyMessage: NotifyMessageService) { }

  set materialListComponent(value: MaterialListComponent) {
    this._materialListComponent = value;
  }

  showModalEdit(materialId: number) {
    this._materialListComponent.materialId = materialId;
    this._materialListComponent.materialEditModal.showModal();
  }

  onEditSuccess($event: any) {
    this.notifyMessage.success('Material atualizado com sucesso!');
    console.log($event);
    this._materialListComponent.getMaterials();
  }

  onEditError($event: HttpErrorResponse) {
    this.notifyMessage.success('Não foi possível atualizar o material.');
    console.log($event);
  }
}
