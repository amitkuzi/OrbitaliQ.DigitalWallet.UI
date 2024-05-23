import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";
import { CommonModule } from '@angular/common';
import { DashboardService, WalletService } from '../../Services/server-api';
import { GlobalGetUserId, InitServiceConfig, primaryBGColor, secColor } from '../../app.component';
import { QRCodeModule } from 'angularx-qrcode';
import { BehaviorSubject, interval } from 'rxjs';
import { TopupStepperComponent } from "../../components/topup-stepper/topup-stepper.component";

@Component({
    selector: 'app-wallet-page',
    standalone: true,
    templateUrl: './wallet-page.component.html',
    styleUrl: './wallet-page.component.css',
    imports: [
        CommonModule,
        QRCodeModule,
        NavigationBarComponent,
        TopupStepperComponent
    ]
})
export class WalletPageComponent implements OnInit , OnDestroy {
  subscription: any;
  darkColor(): string {
    console.log('darkColor',secColor() );
 return secColor() ;
}
  lightColor(): string {
 return '#D5ECF702' ;
  }
  Balance$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  OTFTag$ :  BehaviorSubject<string> = new BehaviorSubject<string>('');
  StartTopup() {

    this.topupState = !this.topupState;
      console.log('StartTopup' , this.topupState );
}
  topupState: boolean = false;
 constructor(private dashboard: DashboardService, private wallet: WalletService) {
    InitServiceConfig(wallet.configuration);
    InitServiceConfig(dashboard.configuration);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngOnInit(): void {

    this.subscription = interval(10000).subscribe((val) => { this.refreshData(); });
    this.refreshData();

  }
  refreshData() {
       this.wallet.applicationWalletRefundablesUserIdGet(GlobalGetUserId()).subscribe((data) => {
      console.log('WalletPageComponent data: ', data);
      this.Balance$.next(data.totleBalance ?? 0);
     });

    this.dashboard.applicationDashboardOTFTagUserIdGet(GlobalGetUserId()).subscribe((data) => {
      console.log('WalletPageComponent data: ', data);
      this.OTFTag$.next(data) ;
    });
  }

}
 