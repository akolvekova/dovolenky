import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrehladFilterComponent } from './prehlad-filter.component';

describe('PrehladFilterComponent', () => {
  let component: PrehladFilterComponent;
  let fixture: ComponentFixture<PrehladFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrehladFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrehladFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
