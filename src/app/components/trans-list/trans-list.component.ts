import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GlobalGetUserId, InitServiceConfig } from '../../app.component';
import { DashboardService, Transaction } from '../../Services/server-api';
import { BehaviorSubject } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-trans-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './trans-list.component.html',
  styleUrl: './trans-list.component.css'
})
export class TransListComponent implements OnInit {
  trasactionList$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);

  constructor(private dashboard: DashboardService) {
    InitServiceConfig(dashboard.configuration);
  }

  ngOnInit(): void {
    this.dashboard.applicationDashboardTrasactionListUserIdSkipTakeGet(GlobalGetUserId(), 0, 5).subscribe((data) => {
      console.log('44 TransListComponent applicationDashboardTrasactionListUserIdSkipTakeGet data: ', data);
      this.trasactionList$.next(data);
    });
  }
}
