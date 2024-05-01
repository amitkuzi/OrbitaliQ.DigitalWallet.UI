import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page.component";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthServiceService } from './Services/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule, RouterOutlet, WelcomePageComponent, LoginComponent, RegisterComponent, FormsModule, MatInputModule]
})
export class AppComponent implements OnInit {
  title = 'OrbitaliQ.DigitalWallet.UI';
  constructor(private authService: AuthServiceService, private router: Router) {
    console.log('WelcomePageComponent constructor IsAuthenticated: ', this.authService.IsAuthenticated);
  }

  ngOnInit(): void {
    if (this.authService.IsAuthenticated) {
      console.log('WelcomePageComponent navigating to /homr ', this.authService.IsAuthenticated);
      this.router.navigate(['/home'], { replaceUrl: true });
    }
    else {
      console.log('WelcomePageComponent navigating to / ', this.authService.IsAuthenticated);
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }
}
