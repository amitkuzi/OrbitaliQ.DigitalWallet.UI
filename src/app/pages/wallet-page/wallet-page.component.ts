import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";
import { CommonModule } from '@angular/common';
import { DashboardService, WalletService } from '../../Services/server-api';
import { GlobalGetUserId, InitServiceConfig, primaryBGColor, secColor } from '../../app.component';
import { QRCodeModule } from 'angularx-qrcode';
import { BehaviorSubject, interval } from 'rxjs';

@Component({
    selector: 'app-wallet-page',
    standalone: true,
    templateUrl: './wallet-page.component.html',
    styleUrl: './wallet-page.component.css',
  imports: [
    CommonModule,
    QRCodeModule,
      NavigationBarComponent
    ]
})
export class WalletPageComponent implements OnInit {
  subscription: any;
  darkColor(): string {
 return secColor() ;
}
  lightColor(): string {
 return primaryBGColor() ;
  }
  Balance$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  OTFTag : string = '';
  StartTopup() {

    this.topupState = !this.topupState;
      console.log('StartTopup' , this.topupState );
}
 topupState: boolean = false;
 constructor(private dashboard: DashboardService, private wallet: WalletService) {
    InitServiceConfig(wallet.configuration);
    InitServiceConfig(dashboard.configuration);
  }
  
  ngOnInit(): void {

    this.subscription = interval(1000).subscribe((val) => { this.refreshData(); });
    this.refreshData();

  }
  refreshData() {
       this.wallet.applicationWalletRefundablesUserIdGet(GlobalGetUserId()).subscribe((data) => {
      console.log('WalletPageComponent data: ', data);
      this.Balance$.next(data.totleBalance ?? 0);
     });

    this.dashboard.applicationDashboardOTFTagUserIdGet(GlobalGetUserId()).subscribe((data) => {
      console.log('WalletPageComponent data: ', data);
      this.OTFTag = data ;
    });
  }

}
 