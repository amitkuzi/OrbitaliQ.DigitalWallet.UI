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


@Component({
    selector: 'app-topup-stepper',
    standalone: true,
    templateUrl: './topup-stepper.component.html',
    styleUrl: './topup-stepper.component.css',
    imports: [
        CommonModule,
        MatButtonModule,
        MatRadioModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        AddCreditCardComponent
    ]
})
export class TopupStepperComponent implements OnInit{
addCardEvent($event: string|undefined) {
throw new Error('Method not implemented.');
}


customAmount: any ;
customAmountValue: any;
selectAmountFormGroup: any= this.formBuilder.group({ customAmount: '' });
selectPaymentFormGroup: any= this.formBuilder.group({ customAmount: '' });
  topupAmounts: FixedAmount[] = [];
selectedAmount: any;
  topupAmount: number = 0;
  avilblePaymentMethods: PaymentMethod[] = [];
  selectedPaymentMethods: PaymentMethod | undefined = undefined;

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
    });
  }

 onAmountChange(arg0: any) {
  console.log('TopupStepperComponent onAmountChange: ', arg0);
   console.log('TopupStepperComponent selectedAmount: ', this.selectedAmount);
   this.topupAmount = this.selectedAmount === 'custom' ? this.customAmountValue ?? 0 : this.selectedAmount;
  }
 
    onPaymentMethodChange(arg0: PaymentMethod) {
      this.selectedPaymentMethods = arg0;
      
  }
 
}
