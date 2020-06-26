import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorNewModalComponent } from './color-new-modal.component';

describe('ColorNewModalComponent', () => {
  let component: ColorNewModalComponent;
  let fixture: ComponentFixture<ColorNewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorNewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
