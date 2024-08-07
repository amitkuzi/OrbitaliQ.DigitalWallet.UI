import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PaymentMethod } from '../../Services/server-api';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pm-item',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule,MatIconModule],
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
