import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSearchFormComponent } from './color-search-form.component';

describe('ColorSearchFormComponent', () => {
  let component: ColorSearchFormComponent;
  let fixture: ComponentFixture<ColorSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
