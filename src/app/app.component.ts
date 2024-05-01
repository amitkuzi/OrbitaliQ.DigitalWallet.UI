import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page.component";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule, RouterOutlet, WelcomePageComponent, LoginComponent, RegisterComponent, FormsModule, MatInputModule]
})
export class AppComponent {
  title = 'OrbitaliQ.DigitalWallet.UI';
  router: Router = new Router();
}
