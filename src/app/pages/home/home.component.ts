import { Component , Output } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";
import { PmItemComponent } from "../../components/pm-item/pm-item.component";
import { PmContainerComponent } from "../../components/pm-container/pm-container.component";
import { TransListComponent } from "../../components/trans-list/trans-list.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavigationBarComponent, PmItemComponent, PmContainerComponent, TransListComponent]
})
export class HomeComponent {
public onadd () {
    console.log('onadd event: ' );
}
 


}
