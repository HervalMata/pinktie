import {Component, OnInit, ViewChild} from '@angular/core';
import {Material} from "../../../../model";
import {MaterialNewModalComponent} from "../material-new-modal/material-new-modal.component";
import {MaterialEditModalComponent} from "../material-edit-modal/material-edit-modal.component";
import {MaterialDeleteModalComponent} from "../material-delete-modal/material-delete-modal.component";
import {MaterialHttpService} from "../../../../services/http/material-http.service";
import {MaterialInsertService} from "./material-insert.service";
import {MaterialEditService} from "./material-edit.service";
import {MaterialDeleteService} from "./material-delete.service";

@Component({
  selector: 'material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {

  materials: Array<Material> = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  sortColumn = {column: '', sort: ''};

  @ViewChild(MaterialNewModalComponent)
  materialNewModal: MaterialNewModalComponent;

  @ViewChild(MaterialEditModalComponent)
  materialEditModal: MaterialEditModalComponent;

  @ViewChild(MaterialDeleteModalComponent)
  materialDeleteModal: MaterialDeleteModalComponent;

  materialId: number;
  searchText: string;

  constructor(
    private materialHttp: MaterialHttpService,
    protected materialInsertService: MaterialInsertService,
    protected materialEditService: MaterialEditService,
    protected materialDeleteService: MaterialDeleteService
  ) {
    this.materialInsertService.materialListComponent = this;
    this.materialEditService.materialListComponent = this;
    this.materialDeleteService.materialListComponent = this;
  }

  ngOnInit() {
    this.getMaterials();
  }

  getMaterials() {
    this.materialHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
      .subscribe(response => {
        console.log(response.data);
        this.materials = response.data;
        this.pagination.totalItems = response.meta.total;
      })
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getMaterials();
  }

  sort(sortColumn) {
    this.getMaterials();
  }

  search(search) {
    this.searchText = search;
    this.getMaterials();
  }

}
