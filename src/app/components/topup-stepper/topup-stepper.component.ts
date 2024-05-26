import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import { DashboardService, FixedAmount, PaymentMethod, SettingService, TopUpDto, WalletService } from '../../Services/server-api';
import { GlobalGetUserId, InitServiceConfig } from '../../app.component';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { AddCreditCardComponent } from "../add-credit-card/add-credit-card.component";
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import { BehaviorSubject } from 'rxjs';
import { PmItemComponent } from "../pm-item/pm-item.component";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-topup-stepper',
    standalone: true,
    templateUrl: './topup-stepper.component.html',
    styleUrl: './topup-stepper.component.css',
    imports: [
        CommonModule,
      MatButtonModule,
        MatSnackBarModule,
        MatRadioModule,
        MatExpansionModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        AddCreditCardComponent,
        PmItemComponent
    ]
})
export class TopupStepperComponent implements OnInit{
 
   @Output() topupResult:  EventEmitter<boolean> = new EventEmitter<boolean>();

  
  customAmountValue: any;
  selectedAmount: any;
  selectAmountFormGroup: any = this.formBuilder.group({ customAmount: '' });
  
  @ViewChild('selectCardSection') selectCardSection!: MatExpansionPanel;
  @ViewChild('newCardSection') newCardSection!: MatExpansionPanel;
  @ViewChild('stepper') stepper!: MatStepper;

  topupAmounts: FixedAmount[] = [];
  topupAmount: number = 0;
  selectPaymentFormGroup: any= this.formBuilder.group({ pmSelectCtrl: '' });
  avilblePaymentMethods: PaymentMethod[] = [];
  selectedPaymentMethod: PaymentMethod | undefined = undefined;
  readonly newPaymentMethid: PaymentMethod = { id: 'new',  cardType:'new', userId: 'new' };

  confirmTopupFormGroup: any= this.formBuilder.group({ executeCtrl: '' });


  constructor(
    private formBuilder: FormBuilder,
    private setting: SettingService,
    private wallet: WalletService,
    private dashboard: DashboardService,
    private snackBar: MatSnackBar)
  {
    InitServiceConfig(setting.configuration);
    InitServiceConfig(dashboard.configuration);
    InitServiceConfig(wallet.configuration);
   
    }
  
  ngOnInit(): void {
    this.setting.applicationSettingTopupAmountsGet().subscribe((data) => {
      console.log('TopupStepperComponent topupAmounts: ', data);
      this.topupAmounts = data;
    });
    
    this.dashboard.applicationDashboardPaymentMethodsUserIdGet(GlobalGetUserId()).subscribe((data) => {
       console.log('TopupStepperComponent avilblePaymentMethods: ', data);
      this.avilblePaymentMethods = data;
       if (this.avilblePaymentMethods.length === 0) {
         this.selectedPaymentMethod = undefined;
         this.newCardExpOpen();
       }

       this.selectedPaymentMethod = this.selectedPaymentMethod ?? this.avilblePaymentMethods[0] ?? undefined;
         this.selectCardExpOpen();

    });
  }

  newCardExpOpen($event: void) {
    console.log('  newCardExpOpen  this.selectedPaymentMethod: ',  this.selectedPaymentMethod);
    if (this.selectCardSection.expanded ) this.selectCardSection.expanded = false;
    if (!this.newCardSection.expanded ) this.newCardSection.expanded = true;
    console.log('  newCardExpOpen  end  ',  this.selectCardSection, this.newCardSection);
}
  selectCardExpOpen($event: void) {
    console.log('  selectCardExpOpen  this.avilblePaymentMethods: ',  this.avilblePaymentMethods);
 
    if (!this.avilblePaymentMethods ) { 
      this.newCardExpOpen();
      console.log('  selectCardExpOpen  end  ',  this.selectCardSection, this.newCardSection);
      return;
    }

  
    this.selectedPaymentMethod = this.selectedPaymentMethod  ?? this.avilblePaymentMethods[0];
    if (!this.selectCardSection.expanded )  this.selectCardSection.expanded =true ;
    if (this.newCardSection.expanded ) this.newCardSection.expanded = false;
    console.log('  selectCardExpOpen  end  ',  this.selectCardSection, this.newCardSection);
    
  }
 
  
  addCardEvent($event: PaymentMethod | undefined) {
    if ($event === undefined || $event == null) {
      console.log('TopupStepperComponent cancle addCardEvent: ', $event);
      this.selectCardExpOpen();
      return;
    }

    console.log('TopupStepperComponent addCardEvent: ', $event);
    this.dashboard.applicationDashboardPaymentMethodsUserIdGet(GlobalGetUserId()).subscribe((data) => {
      this.avilblePaymentMethods = data;
      this.selectedPaymentMethod = $event;
      this.stepper.next();      });
}


 onAmountChange(arg0: any) {
   this.topupAmount = this.selectedAmount === 'custom' ? this.customAmountValue ?? 0 : this.selectedAmount;
  }
 
    onPaymentMethodChange(arg0: PaymentMethod) {
      this.selectedPaymentMethod = arg0;
  }

  exeTopup() {

    if (typeof this.selectedPaymentMethod !== 'undefined')
    {
      const topUpDto : TopUpDto = {
        amount: this.topupAmount,
        currency: 'USD',
        description: 'topup',
        paymentMethodId: this.selectedPaymentMethod.id ,
      };

      this.wallet.applicationWalletTopupUserIdPost(GlobalGetUserId(),topUpDto).subscribe((data) => { 
        console.log('TopupStepperComponent exeTopup: ', data);
        this.stepper.reset();
        this.topupResult.emit(true);
        this.snackBar.open('topup approved', 'close', {
          panelClass: ['error-snackbar'],
          duration: 2000,
        });
      });
      return;
    }

      console.warn('TopupStepperComponent exeTopup error : ', this.selectedPaymentMethod);
     this.snackBar.open('topup unknown error start new ', 'close', {
        panelClass: ['error-snackbar'],
        duration: 2000,
     });
    
    this.stepper.reset();
}
cancelTopup() {
  this.stepper.reset();
  this.topupResult.emit(false);
        this.snackBar.open('topup cancle', 'close', {
        panelClass: ['error-snackbar'],
        duration: 2000,
      });
}
 
}