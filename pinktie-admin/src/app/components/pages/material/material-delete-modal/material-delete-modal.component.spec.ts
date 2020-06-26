import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDeleteModalComponent } from './material-delete-modal.component';

describe('MaterialDeleteModalComponent', () => {
  let component: MaterialDeleteModalComponent;
  let fixture: ComponentFixture<MaterialDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
