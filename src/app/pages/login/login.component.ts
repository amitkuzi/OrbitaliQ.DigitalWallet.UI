import { Component, NgModule } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatDividerModule,MatSnackBarModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userEmail: string = '';
  Password: string = '';

  LogIn() {
    console.log('LoginComponent constructor called IsAuthenticated: ', this.authService.IsAuthenticated);
    this.authService.Login(this.userEmail, this.Password).
      then((res) => {
        console.log("Login: ", res);
        if (this.authService.IsAuthenticated) { this.router.navigate(['/home'], { replaceUrl: true }); }
        else { this.snackBar.open(`Login Failed `, 'Close', { duration: 2000 }); }
      }).
      catch((err) => {
        console.error("Error: ", err);
         this.snackBar.open(`Login Failed ${err.message}`, 'Close', { duration: 2000 });
      });
  }

  hide: boolean = true;
  constructor(
    private authService: AuthServiceService,
    private snackBar: MatSnackBar,
    private router: Router) {
    console.log('LoginComponent constructor called IsAuthenticated: ', this.authService.IsAuthenticated);
  }
}
