import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglesessionComponent } from './singlesession.component';

describe('SinglesessionComponent', () => {
  let component: SinglesessionComponent;
  let fixture: ComponentFixture<SinglesessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglesessionComponent]
    });
    fixture = TestBed.createComponent(SinglesessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
