import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearntolearnComponent } from './learntolearn.component';

describe('LearntolearnComponent', () => {
  let component: LearntolearnComponent;
  let fixture: ComponentFixture<LearntolearnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearntolearnComponent]
    });
    fixture = TestBed.createComponent(LearntolearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
