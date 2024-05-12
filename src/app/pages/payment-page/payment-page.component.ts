import { Component } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";
import { PmContainerComponent } from "../../components/pm-container/pm-container.component";

@Component({
    selector: 'app-payment-page',
    standalone: true,
    templateUrl: './payment-page.component.html',
    styleUrl: './payment-page.component.css',
    imports: [NavigationBarComponent, PmContainerComponent]
})
export class PaymentPageComponent {

}
