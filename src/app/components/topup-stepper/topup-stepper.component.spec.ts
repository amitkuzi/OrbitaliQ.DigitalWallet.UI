import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupStepperComponent } from './topup-stepper.component';

describe('TopupStepperComponent', () => {
  let component: TopupStepperComponent;
  let fixture: ComponentFixture<TopupStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopupStepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopupStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
