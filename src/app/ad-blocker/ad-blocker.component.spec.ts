import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdBlockerComponent } from './ad-blocker.component';

describe('AdBlockerComponent', () => {
  let component: AdBlockerComponent;
  let fixture: ComponentFixture<AdBlockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdBlockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdBlockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
