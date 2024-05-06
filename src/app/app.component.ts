import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page.component";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthServiceService } from './Services/auth-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    WelcomePageComponent,
    LoginComponent,
    RegisterComponent,
    FormsModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    BrowserAnimationsModule]
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
