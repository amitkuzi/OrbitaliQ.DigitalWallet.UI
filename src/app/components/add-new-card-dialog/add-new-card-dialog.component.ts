import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-add-new-card-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './add-new-card-dialog.component.html',
  styleUrl: './add-new-card-dialog.component.css'
})
export class AddNewCardDialogComponent implements OnInit {
  cardNumber: string = '';
  cardNumberCtrlGroup: any;
  cardNumberCtrl: any;
 CardDetailFrom: FormGroup<any> =new FormGroup({
      cardNumberCtrl: new FormControl()
  });
  
   constructor(
    public dialogRef: MatDialogRef<AddNewCardDialogComponent>,
    private formBuilder:FormBuilder,
  ) {}

ngOnInit(): void {
 
 

  this.cardNumberCtrlGroup = this.formBuilder.group({
    CardDetailFrom: ['cardNumberCtrl'],
  });
 
  this.cardNumberCtrl = this.formBuilder.control({
    cardNumberCtrl: ['', Validators.required  ],
  });
  console.log('CardDetailFrom :', this.CardDetailFrom);
}
  closeDialog(): void {
    this.dialogRef.close();
  }

  saveItem(): void {
     console.log('save :', this.cardNumber);
    // Implement logic to save the item (e.g., using a service)
    // You can access the entered item name from this.itemName
    this.dialogRef.close(this.cardNumberCtrlGroup ); // Optionally return the entered item name
   
  }
}
