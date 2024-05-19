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
import { ExpirationDateMaskDirective } from '../../components/expiration-date-mask.directive';
import { DashboardService } from '../../Services/server-api';
import { InitServiceConfig } from '../../app.component';
import { AddCreditCardComponent } from "../../components/add-credit-card/add-credit-card.component";

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
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        ExpirationDateMaskDirective,
        FormsModule,
        AddCreditCardComponent
    ]
})
export class WalletPageComponent implements OnInit {

 NewCardStete: boolean = false;
  currentCard: string | undefined;
 

  constructor(
    private formBuilder: FormBuilder,
    private dashboard: DashboardService) {
    InitServiceConfig(dashboard.configuration);
  }
  
  ngOnInit(): void {
 
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
 