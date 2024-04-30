import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatDividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LogIn() {
    throw new Error('Method not implemented.');
  }
  hide: boolean = true;
  constructor(private authService: AuthServiceService) {

    console.log('LoginComponent constructor called IsAuthenticated: ', authService.IsAuthenticated);
  }
}
