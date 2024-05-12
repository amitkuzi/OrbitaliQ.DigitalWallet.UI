import { Component } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";

@Component({
    selector: 'app-setting-page',
    standalone: true,
    templateUrl: './setting-page.component.html',
    styleUrl: './setting-page.component.css',
    imports: [NavigationBarComponent]
})
export class SettingPageComponent {

}
