import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatGridListModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent implements OnInit {

  constructor(private authService: AuthServiceService, private router: Router) {
    console.log('WelcomePageComponent constructor IsAuthenticated: ', this.authService.IsAuthenticated);
  }

  ngOnInit(): void {
    if (this.authService.IsAuthenticated) {
      console.log('WelcomePageComponent navigating to /homr ', this.authService.IsAuthenticated);
      this.router.navigate(['/home'], { replaceUrl: true });
    }
  }
}

