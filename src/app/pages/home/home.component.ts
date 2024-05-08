import { Component } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";
import { PmItemComponent } from "../../components/pm-item/pm-item.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavigationBarComponent, PmItemComponent]
})
export class HomeComponent {

}
