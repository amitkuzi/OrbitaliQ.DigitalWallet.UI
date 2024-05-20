import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";
import { CommonModule, NgIf } from '@angular/common';

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
  StartTopup() {

    this.topupState = !this.topupState;
      console.log('StartTopup' , this.topupState );
}

 topupState: boolean = false;
  
 
  constructor() {}
  
  ngOnInit(): void {}

}
 