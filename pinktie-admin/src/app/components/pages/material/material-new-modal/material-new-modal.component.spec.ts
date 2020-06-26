import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialNewModalComponent } from './material-new-modal.component';

describe('MaterialNewModalComponent', () => {
  let component: MaterialNewModalComponent;
  let fixture: ComponentFixture<MaterialNewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialNewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
