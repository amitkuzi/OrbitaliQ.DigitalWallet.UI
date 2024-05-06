import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  constructor(private authService: AuthServiceService, private router: Router) {
    console.log('LoginComponent constructor called IsAuthenticated: ', this.authService.IsAuthenticated);
  }
}
