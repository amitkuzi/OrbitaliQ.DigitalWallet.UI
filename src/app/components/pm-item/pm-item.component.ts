import { Component, Input } from '@angular/core';
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

  @Input() public pmItem: PaymentMethod | undefined | null = undefined;

  public get CardNumber(): string {
    return this.pmItem?.cardNumber ?? '';
  }
}
