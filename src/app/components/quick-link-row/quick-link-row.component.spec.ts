import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickLinkRowComponent } from './quick-link-row.component';

describe('QuickLinkRowComponent', () => {
  let component: QuickLinkRowComponent;
  let fixture: ComponentFixture<QuickLinkRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickLinkRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickLinkRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
