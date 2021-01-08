import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StavItemComponent } from './stav-item.component';

describe('StavItemComponent', () => {
  let component: StavItemComponent;
  let fixture: ComponentFixture<StavItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StavItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
