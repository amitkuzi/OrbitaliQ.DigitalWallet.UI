import { Component, OnInit, Output } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";
import { PmContainerComponent } from "../../components/pm-container/pm-container.component";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExpirationDateMaskDirective } from '../../components/expiration-date-mask.directive';
import { CreaditCardPaymentMethod, DashboardService, PaymentMethod } from '../../Services/server-api';
import { InitServiceConfig } from '../../app.component';
import { AddCreditCardComponent } from "../../components/add-credit-card/add-credit-card.component";
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-payment-page',
    standalone: true,
    templateUrl: './payment-page.component.html',
    styleUrl: './payment-page.component.css',
    imports: [
        NavigationBarComponent,
        PmContainerComponent,
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        ExpirationDateMaskDirective,
        FormsModule,
        AddCreditCardComponent
    ]
})
export class PaymentPageComponent implements OnInit {

    currentPMChange($event: PaymentMethod | undefined) {
        console.log('currentPMChange', $event);
    this.currentPM$.next($event);
}

 NewCardStete: boolean = false;
  currentCard: string | undefined;
 currentPM$: BehaviorSubject<PaymentMethod | undefined> = new BehaviorSubject<PaymentMethod | undefined>(undefined);
 

  constructor() {}
  
       ngOnInit(): void {
           if (this.currentPM$.value !== undefined) { this.NewCardStete = true; }
          }

      AddNewCard() {
        this.NewCardStete = true;
      }

  CancleAddCard() {
 this.NewCardStete = false;
}

 
  addCardEvent($event: string|undefined) {
    console.log('addCardEvent', $event);
    if ($event !== undefined) {
      this.currentCard = $event;
    }
      
    this.NewCardStete = false;
    console.log('addCardEvent this.currentCard', this.currentCard);
  }
  
}

 