import { Component, NgModule } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatDividerModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userEmail: string = '';
  Password: string = '';

  LogIn() {
    console.log('LoginComponent constructor called IsAuthenticated: ', this.authService.IsAuthenticated);
    this.authService.Login(this.userEmail, this.Password).
      then((res) => { console.log("Login: ", res); this.router.navigate(['/home'], { replaceUrl: true }); }).
      catch((err) => { console.error("Error: ", err); alert("Invalid Credentials!"); });
  }

  hide: boolean = true;
  constructor(private authService: AuthServiceService, private router: Router) {
    console.log('LoginComponent constructor called IsAuthenticated: ', this.authService.IsAuthenticated);
  }
}
