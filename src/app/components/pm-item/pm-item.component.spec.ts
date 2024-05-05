import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmItemComponent } from './pm-item.component';

describe('PmItemComponent', () => {
  let component: PmItemComponent;
  let fixture: ComponentFixture<PmItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PmItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
