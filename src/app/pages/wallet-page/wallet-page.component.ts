import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";
import { CommonModule, NgIf } from '@angular/common';
import { DashboardService } from '../../Services/server-api';
import { GlobalGetUserId, InitServiceConfig } from '../../app.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
    selector: 'app-wallet-page',
    standalone: true,
    templateUrl: './wallet-page.component.html',
    styleUrl: './wallet-page.component.css',
  imports: [
      CommonModule,
      NavigationBarComponent
    ]
})
export class WalletPageComponent implements OnInit {
  OTFTag$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  StartTopup() {

    this.topupState = !this.topupState;
      console.log('StartTopup' , this.topupState );
}
 topupState: boolean = false;
 constructor(private dashboard: DashboardService) {
    InitServiceConfig(dashboard.configuration);
  }
  
  ngOnInit(): void {
    this.dashboard.applicationDashboardOTFTagUserIdGet(GlobalGetUserId()).subscribe((data) => {
      console.log('WalletPageComponent data: ', data);
      this.OTFTag$.next(data);
    });
  }

}
 