import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalGetUserId, InitServiceConfig } from '../../app.component';
import { DashboardService, PaymentMethod } from '../../Services/server-api';
import { BehaviorSubject, max, min } from 'rxjs';
import { PmItemComponent } from "../pm-item/pm-item.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-pm-container',
  standalone: true,
  templateUrl: './pm-container.component.html',
  styleUrl: './pm-container.component.css',
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    PmItemComponent]
})
export class PmContainerComponent implements OnInit {

  index: number = 0;
  @Input() currentCardId: any;
  PaymentMethods$: BehaviorSubject<Array<PaymentMethod>> = new BehaviorSubject<Array<PaymentMethod>>([]);
  current$: BehaviorSubject<PaymentMethod | undefined> = new BehaviorSubject<PaymentMethod | undefined>(undefined);
  @Output() currentPaymentMethod$: EventEmitter<PaymentMethod | undefined> = new EventEmitter<PaymentMethod | undefined>(undefined);
  
    constructor(private dashboard: DashboardService) {
    InitServiceConfig(dashboard.configuration);
  }

  ngOnInit(): void {
    console.log('3 PmContainerComponent ngOnInit');

    this.current$.subscribe((value) => {
      this.currentCardId = value?.id ?? undefined;
      this.currentPaymentMethod$.emit(value);
    });
    this.refresh();
  }

    refresh() {
      this.dashboard.applicationDashboardPaymentMethodsUserIdGet(GlobalGetUserId()).subscribe((data) => {

        this.PaymentMethods$.next(data);
        this.current$.next(this.PaymentMethods$.value[this.index]);
      });
    }
  prev() {
    this.index = Math.max(this.index - 1, 0);
    this.current$.next(this.PaymentMethods$.value[this.index] ?? undefined);
  }

  next() {
    this.index = Math.min(this.index + 1, this.PaymentMethods$.value?.length - 1);
    this.current$.next(this.PaymentMethods$.value[this.index] ?? undefined);
  }

  removeCurrent() {
     
    // remove this.dashboard.applicationDashboardPaymentMethodIdDelete(GlobalGetUserId(), this.current$.value?.id ?? '').subscribe(() => {
    this.refresh();
  }


}
