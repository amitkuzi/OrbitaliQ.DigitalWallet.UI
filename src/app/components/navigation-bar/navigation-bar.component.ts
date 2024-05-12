import { Component, EventEmitter } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
   public onAddEvent: EventEmitter<void> = new EventEmitter<void>();
  
  AddEvent() {
    this.onAddEvent.emit();
    console.log('onAddEvent.emit();');
  }
  

}
