import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";
import { PmContainerComponent } from "../../components/pm-container/pm-container.component";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreditCardValidators } from 'angular-cc-library';

@Component({
    selector: 'app-wallet-page',
    standalone: true,
    templateUrl: './wallet-page.component.html',
    styleUrl: './wallet-page.component.css',
  imports: [
    NavigationBarComponent,
    PmContainerComponent,
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class WalletPageComponent implements OnInit {
 NewCardStete: boolean = true;
cardDetailFrom: FormGroup<any> = new FormGroup({});
cardNumberCtrlGroup: any;
cardNumber: string = '';
cardExpDate:  string = '';
cardCvv: string = '';
cardHolderName:  string = '';
cardHolderZIP:  string = '';

 
  constructor(private formBuilder: FormBuilder,) { }
  
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

  AddNewCard() {
    this.NewCardStete = true;
  }

  CancleAddCard() {
 this.NewCardStete = false;
}

  saveItem(): void {
    console.log('save :', this.cardNumber);
  }
}
