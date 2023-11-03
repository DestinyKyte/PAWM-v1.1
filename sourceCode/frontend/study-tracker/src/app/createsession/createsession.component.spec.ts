import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesessionComponent } from './createsession.component';

describe('CreatesessionComponent', () => {
  let component: CreatesessionComponent;
  let fixture: ComponentFixture<CreatesessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatesessionComponent]
    });
    fixture = TestBed.createComponent(CreatesessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
