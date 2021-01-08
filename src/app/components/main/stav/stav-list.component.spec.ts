import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StavListComponent } from './stav-list.component';

describe('StavListComponent', () => {
  let component: StavListComponent;
  let fixture: ComponentFixture<StavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StavListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
