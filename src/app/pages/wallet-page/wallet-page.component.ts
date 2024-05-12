import { Component } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";

@Component({
    selector: 'app-wallet-page',
    standalone: true,
    templateUrl: './wallet-page.component.html',
    styleUrl: './wallet-page.component.css',
    imports: [NavigationBarComponent]
})
export class WalletPageComponent {

}
