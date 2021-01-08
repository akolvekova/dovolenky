import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrehladItemComponent } from './prehlad-item.component';

describe('PrehladItemComponent', () => {
  let component: PrehladItemComponent;
  let fixture: ComponentFixture<PrehladItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrehladItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrehladItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
