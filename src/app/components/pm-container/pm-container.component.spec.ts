import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmContainerComponent } from './pm-container.component';

describe('PmContainerComponent', () => {
  let component: PmContainerComponent;
  let fixture: ComponentFixture<PmContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PmContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
