import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSearchFormComponent } from './material-search-form.component';

describe('MaterialSearchFormComponent', () => {
  let component: MaterialSearchFormComponent;
  let fixture: ComponentFixture<MaterialSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
