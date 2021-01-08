import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrehladListComponent } from './prehlad-list.component';

describe('PrehladListComponent', () => {
  let component: PrehladListComponent;
  let fixture: ComponentFixture<PrehladListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrehladListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrehladListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
