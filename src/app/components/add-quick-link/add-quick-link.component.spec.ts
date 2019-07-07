import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuickLinkComponent } from './add-quick-link.component';

describe('AddQuickLinkComponent', () => {
  let component: AddQuickLinkComponent;
  let fixture: ComponentFixture<AddQuickLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuickLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuickLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
