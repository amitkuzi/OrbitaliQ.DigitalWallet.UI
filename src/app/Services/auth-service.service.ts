import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, firstValueFrom } from 'rxjs';
import { appGlobals } from '../app.component';
import { environment } from '../../environments/environment';
import { FullUserDto, AuthService, SettingService } from './server-api';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public Bearer$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public Authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public UserDetails$: BehaviorSubject<FullUserDto | undefined> = new BehaviorSubject<FullUserDto | undefined>(undefined);
  UserImageUrl$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    private authService: AuthService,
    private settingService: SettingService,
  ) {

    this.authService.configuration.credentials[appGlobals._bearerKey] = () => this.Bearer;
    this.authService.configuration.basePath = environment.apiUrl;
    this.settingService.configuration.credentials[appGlobals._bearerKey] = () => this.Bearer;
    this.settingService.configuration.basePath = environment.apiUrl;
    this.Bearer$.next(this.Bearer);

    this.Bearer$.subscribe((value) => {
      console.log('AuthServiceService Bearer|changed IsAuthenticated: ', this.IsAuthenticated);
      if (this.IsAuthenticated) {
        this.settingService.applicationSettingUserDetailsUserIdGet(this.UserID).subscribe((result) => {

          this.UserDetails$.next(result);
          console.log(' 111 applicationAuthUserImageUrlUserIdGet ');
          this.authService.applicationAuthUserImageUrlUserIdGet(this.UserID).subscribe((result) => {
            if (typeof result === 'string') {
              this.UserImageUrl$.next(result);
            }
          });
        });
        this.Authenticated$.next(this.IsAuthenticated);

      }


    });

  }


  public set Bearer(value: string) {
    localStorage.setItem(appGlobals._bearerKey, value);
    this.Bearer$.next(value);
  }
  public get Bearer(): string {
    return localStorage.getItem(appGlobals._bearerKey) || '';
  }

  public get UserID(): string {
    return localStorage.getItem(appGlobals._userIdKey) || '';
  }

  public set UserId(value: string) {
    localStorage.setItem(appGlobals._userIdKey, value || '');
  }

  public get IsAuthenticated(): boolean {
    return !!this.Bearer;
  }

  public Logout(): Promise<boolean> {
    localStorage.removeItem(appGlobals._bearerKey);
    localStorage.removeItem(appGlobals._userIdKey);
    this.Bearer$.next('');
    return Promise.resolve(true);
  }

  public Login(userName: string, password: string): Promise<boolean> {
    const success = new Subject<boolean>();
    console.log('Login start  ', { userName: userName, password: password });
    this.authService.applicationAuthLoginPost({ userName: userName, password: password }).subscribe((result) => {
      console.log('applicationAuthLoginPost ', result);
      if (!result) {
        console.error('Login fail : Unknown error');
        success.next(this.IsAuthenticated);
        return;
      }
      if (!result.isSuccess) {
        console.error("Login fail : ", result.failMessage || 'Unknown error');
        success.next(this.IsAuthenticated);
      }

      this.UserId = result.userID || '';
      this.Bearer = result.token || '';
      success.next(this.IsAuthenticated);
    }, (error) => {
      console.error("Login error : ", error);
      success.next(this.IsAuthenticated);
    });
    return firstValueFrom(success);
  }
}


