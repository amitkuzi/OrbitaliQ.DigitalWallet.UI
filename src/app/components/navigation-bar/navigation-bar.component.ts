import { Component, Output,EventEmitter,Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent  {
  constructor(private router: Router) { }
  @Output() public onAddEvent: EventEmitter<void> = new EventEmitter<void>();
   @Input() Tooltip: string = '';
  @Input() disableAddButton: boolean = false;
  
  AddEvent() {
    if(!this.disableAddButton){
    this.onAddEvent.emit();
      console.log('onAddEvent.emit() disableAddButton;',this.disableAddButton);
      }
  }
  

}
