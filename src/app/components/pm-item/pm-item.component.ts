import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaymentMethod } from '../../Services/server-api';

@Component({
  selector: 'app-pm-item',
  standalone: true,
  imports: [],
  templateUrl: './pm-item.component.html',
  styleUrl: './pm-item.component.css'
})
export class PmItemComponent {
  constructor() { }

  pmItem: BehaviorSubject<PaymentMethod | undefined> = new BehaviorSubject<PaymentMethod | undefined>(undefined);

  public get CardNumber(): string {
    return this.pmItem.value?.cardNumber ?? '';
  }
}
