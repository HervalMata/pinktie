import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'color-search-form',
  templateUrl: './color-search-form.component.html',
  styleUrls: ['./color-search-form.component.css']
})
export class ColorSearchFormComponent implements OnInit {

  search: "";

  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.onSearch.emit(this.search);
    return false;
  }

}
