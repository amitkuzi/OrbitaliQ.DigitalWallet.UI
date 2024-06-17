import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { BehaviorSubject } from 'rxjs';
import { FullUserDto } from '../../Services/server-api';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu'; // Add this import statement
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule ,
    MatMenuModule  
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {


  hideDropDown() {
    this.hiddenDropDown = !this.hiddenDropDown
    console.log('hiddenDropDown: ', this.hiddenDropDown);
  }

  hiddenDropDown: boolean = true;

  constructor(private authService: AuthServiceService, private router: Router) {
    console.log('LoginComponent constructor called IsAuthenticated: ', this.authService.IsAuthenticated);
    this.authService.UserDetails$.subscribe((user) => {
      console.log('UserHeaderComponent UserHeader: ', user);
     var header =  user?.firstName && user?.lastName? `Welcome ${user.firstName} ${user.lastName}` : user ? `Welcome ${user.userName}` : 'UserHeader';
      this.UserHeader$.next(header);
    });
  }

  UserHeader$: BehaviorSubject<string> = new BehaviorSubject<string>('UserHeader');

  public get IsAuthenticated(): boolean {
    return this.authService.IsAuthenticated;
  }

  public get Authenticated$(): BehaviorSubject<boolean> {
    return this.authService.Authenticated$;
  }

  public Logout(): void {
    this.authService.Logout().then((result) => {
      console.log('Logout result: ', result);
      this.router.navigate(['/']);
    });
  }

  public get UserDetails(): BehaviorSubject<FullUserDto | undefined> {
    return this.authService.UserDetails$;
  }



  public get UserImageUrl(): string {
    return this.authService.UserImageUrl$.value ?? '';
  }

  About() {
    this.authService.About().then((result) => {
      console.log('About result: ', result);
      var data = JSON.stringify({
        "screen.availHeight": screen.availHeight,
        "screen.availWidth": screen.availWidth,
        "Server": result,

      }, null, 2);
      console.log('About called',screen);
      window.alert(data);
    });
  
}


}
