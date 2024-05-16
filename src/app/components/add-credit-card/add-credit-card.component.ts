import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExpirationDateMaskDirective } from '../expiration-date-mask.directive';
import { DashboardService } from '../../Services/server-api';
import { InitServiceConfig } from '../../app.component';

@Component({
  selector: 'app-add-credit-card',
  standalone: true,
  imports: [
        CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    ExpirationDateMaskDirective,
    FormsModule
  ],
  templateUrl: './add-credit-card.component.html',
  styleUrl: './add-credit-card.component.css'
})
export class AddCreditCardComponent {
  
   @Output() public onAddEvent: EventEmitter<void> = new EventEmitter<void>();
cardDetailFrom: FormGroup<any> = new FormGroup({});
cardNumberCtrlGroup: any;
cardNumber: string = '';
cardExpDate:  string = '';
cardCvv: string = '';
cardHolderName:  string = '';
cardHolderZIP:  string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dashboard: DashboardService) {
    InitServiceConfig(dashboard.configuration);
  }
  CancleAddCard() {
}

  saveNewCard(): void {
    console.log('save :', this.cardNumberCtrlGroup.value);
}



// {
//     "cardNumberCtrl": "5454545454545454",
//     "expirationDateCtrl": "12/34",
//     "ccvCtrl": "654",
//     "cardHolderCtrl": "asdafa wd aw",
//     "cardHolderZIP": "5826129",
//     "saveDetilsCtrl": "true"
// }
}
