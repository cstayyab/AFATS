import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlActionsComponent } from './ql-actions.component';

describe('QlActionsComponent', () => {
  let component: QlActionsComponent;
  let fixture: ComponentFixture<QlActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
