import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthServiceService) {

    console.log('LoginComponent constructor called IsAuthenticated: ', authService.IsAuthenticated);
  }
}
