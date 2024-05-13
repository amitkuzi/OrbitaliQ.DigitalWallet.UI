import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page.component";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthServiceService } from './Services/auth-service.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../environments/environment.development';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserHeaderComponent } from "./components/user-header/user-header.component";
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Configuration } from './Services/server-api';

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
    MatToolbarModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    UserHeaderComponent,

    CommonModule
  ]
})
export class AppComponent implements OnInit {
  title = `OrbitaliQ.DigitalWallet.UI ${environment.production ? 'Production' : 'Development'}`;

  IsAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private authService: AuthServiceService,
    private router: Router) {
    console.log('WelcomePageComponent constructor IsAuthenticated: ', this.authService.IsAuthenticated);
  }

  ngOnInit(): void {
    this.authService.Bearer$.subscribe((value) => {
      console.log('222 AppComponent Bearer|changed IsAuthenticated: ', this.authService.IsAuthenticated);
      this.IsAuthenticated$.next(this.authService.IsAuthenticated);
    });

    // if (this.authService.IsAuthenticated) {
    //   console.log('222 WelcomePageComponent navigating to /home ', this.authService.IsAuthenticated);
    //   this.router.navigate(['/home'], { replaceUrl: true });
    // }
    if (this.authService.IsAuthenticated === false) {
      console.log('222 WelcomePageComponent navigating to / ', this.authService.IsAuthenticated);
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }
}


export const appGlobals = {
  _bearerKey: 'Bearer',
  _userIdKey: 'userId',
}

export function GlobalGetUserId(): string { return localStorage.getItem(appGlobals._userIdKey) || ''; }

export function InitServiceConfig(conf: Configuration): Configuration {
  conf.credentials[appGlobals._bearerKey] = () => localStorage.getItem(appGlobals._bearerKey) || '';
  conf.basePath = environment.apiUrl;
  return conf
}