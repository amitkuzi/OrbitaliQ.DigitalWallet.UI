import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCardDialogComponent } from './add-new-card-dialog.component';

describe('AddNewCardDialogComponent', () => {
  let component: AddNewCardDialogComponent;
  let fixture: ComponentFixture<AddNewCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewCardDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
