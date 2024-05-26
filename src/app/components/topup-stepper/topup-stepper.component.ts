import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { CreaditCardPaymentMethod, DashboardService, FixedAmount, PaymentMethod, SettingService } from '../../Services/server-api';
import { GlobalGetUserId, InitServiceConfig } from '../../app.component';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { AddCreditCardComponent } from "../add-credit-card/add-credit-card.component";
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
    selector: 'app-topup-stepper',
    standalone: true,
    templateUrl: './topup-stepper.component.html',
    styleUrl: './topup-stepper.component.css',
    imports: [
        CommonModule,
        MatButtonModule,
      MatRadioModule,
        MatExpansionModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        AddCreditCardComponent
    ]
})
export class TopupStepperComponent implements OnInit{
customAmount: any ;
customAmountValue: any;
selectAmountFormGroup: any= this.formBuilder.group({ customAmount: '' });
selectPaymentFormGroup: any= this.formBuilder.group({ customAmount: '' });
  topupAmounts: FixedAmount[] = [];
selectedAmount: any;
  topupAmount: number = 0;
  avilblePaymentMethods: PaymentMethod[] = [];
  selectedPaymentMethod: PaymentMethod | undefined = undefined;
  readonly newPaymentMethid: PaymentMethod = { id: 'new',  cardType:'new', userId: 'new' };
  
  constructor(private formBuilder: FormBuilder, private setting: SettingService,private dashboard: DashboardService) {
    InitServiceConfig(setting.configuration);
     InitServiceConfig(dashboard.configuration);
    }
  
  ngOnInit(): void {
    this.setting.applicationSettingTopupAmountsGet().subscribe((data) => {
      console.log('TopupStepperComponent data: ', data);
      this.topupAmounts = data;
    });
    
     this.dashboard.applicationDashboardPaymentMethodsUserIdGet(GlobalGetUserId()).subscribe((data) => {
       this.avilblePaymentMethods = data;
       this.selectedPaymentMethod = this.avilblePaymentMethods[0] ?? this.newPaymentMethid;
    });
  }

  newCardExpOpen($event: void) {
  this.selectedPaymentMethod = this.newPaymentMethid;
}
  selectCardExpOpen($event: void) {
    if (this.avilblePaymentMethods == null || this.avilblePaymentMethods.length === 0) { 
      this.selectedPaymentMethod = this.newPaymentMethid;
      return;
    }
    if (this.selectedPaymentMethod === undefined || this.selectedPaymentMethod == null) {
      this.selectedPaymentMethod = this.avilblePaymentMethods[0];
    }
  }
  
  addCardEvent($event: PaymentMethod | undefined) {
  console.log('TopupStepperComponent addCardEvent: ', $event);
     this.dashboard.applicationDashboardPaymentMethodsUserIdGet(GlobalGetUserId()).subscribe((data) => {
       this.avilblePaymentMethods = data;
       this.selectedPaymentMethod = this.avilblePaymentMethods.find((x) => x.id === $event) ?? this.newPaymentMethid;
       console.log('TopupStepperComponent addCardEvent selectedPaymentMethod: ', this.selectedPaymentMethod);
    });
}


 onAmountChange(arg0: any) {
  console.log('TopupStepperComponent onAmountChange: ', arg0);
   console.log('TopupStepperComponent selectedAmount: ', this.selectedAmount);
   this.topupAmount = this.selectedAmount === 'custom' ? this.customAmountValue ?? 0 : this.selectedAmount;
  }
 
    onPaymentMethodChange(arg0: PaymentMethod) {
      this.selectedPaymentMethod = arg0;
      
  }
 

ondebgClos($event: void) {
  console.log('TopupStepperComponent ondebgClos: ', $event);
  console.log('TopupStepperComponent selectedPaymentMethod: ', this.selectedPaymentMethod);
}

}
