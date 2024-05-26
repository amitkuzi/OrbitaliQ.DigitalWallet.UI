import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreditCardValidators } from 'angular-cc-library';
import { CreaditCardPaymentMethod, DashboardService, PaymentMethod } from '../../Services/server-api';
import { GlobalGetUserId, InitServiceConfig } from '../../app.component';
import { ExpirationDateMaskDirective } from '../expiration-date-mask.directive';

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
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './add-credit-card.component.html',
  styleUrl: './add-credit-card.component.css'
})
export class AddCreditCardComponent implements OnInit{
  
  @Output() public onAddEvent: EventEmitter<PaymentMethod|undefined> = new EventEmitter<PaymentMethod|undefined>();
  waiting : boolean = false;
cardDetailFrom: FormGroup<any> = new FormGroup({});
cardNumberCtrlGroup: any;
cardNumber: string = '';
cardExpDate:  string = '';
cardCvv: string = '';
cardHolderName:  string = '';
cardHolderZIP:  string = '';

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dashboard: DashboardService) {
    InitServiceConfig(dashboard.configuration);
  }

ngOnInit(): void {
    this.cardNumberCtrlGroup = this.formBuilder.group({
      cardNumberCtrl: [, [CreditCardValidators.validateCCNumber]],
      expirationDateCtrl: ['', [CreditCardValidators.validateExpDate]],
      ccvCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      cardHolderCtrl: ['', [Validators.required]],
      cardHolderZIP: ['', [Validators.required]],
      saveDetilsCtrl: ['true']
    });
  
}

  
  CancleAddCard() {
    this.onAddEvent.emit(undefined);
}

  saveNewCard(): void {
    console.log('save :', this.cardNumberCtrlGroup.value);
this.waiting = true;
    const pmItem: CreaditCardPaymentMethod = {
      userId: GlobalGetUserId(),
      cardNumber: this.cardNumberCtrlGroup.value.cardNumberCtrl,
      cvv: this.cardNumberCtrlGroup.value.ccvCtrl,
      cardExpire: this.cardNumberCtrlGroup.value.expirationDateCtrl,
      cardHolderName : this.cardNumberCtrlGroup.value.cardHolderCtrl,
      cardHolderData: this.cardNumberCtrlGroup.value.cardHolderZIP,
      //saveDetils: this.cardNumberCtrlGroup.value.saveDetilsCtrl
    };
  
    this.dashboard.applicationDashboardPaymentMethodsUserIdPut(GlobalGetUserId(), pmItem).subscribe((res) => {
      console.log('add new card res :', res);
      this.onAddEvent.emit(res);
      this.waiting = false;
    }, (err) => {
      console.log('add new card err :', err);
      this.snackBar.open('Error saving Card: ' + err.error, 'close', {
        panelClass: ['error-snackbar'],
        duration: 2000,
      });
      this.waiting = false;
    });
}

}
