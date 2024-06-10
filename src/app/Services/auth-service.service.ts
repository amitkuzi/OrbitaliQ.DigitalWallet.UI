import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, firstValueFrom } from 'rxjs';
import { InitServiceConfig, appGlobals } from '../app.component';
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

    InitServiceConfig(this.authService.configuration);
    InitServiceConfig(this.settingService.configuration);
    this.Bearer$.next(this.Bearer);
    this.Bearer$.subscribe((value) => {
      if (this.IsAuthenticated) {
        this.settingService.applicationSettingUserDetailsUserIdGet(this.UserID).subscribe((result) => {
          this.UserDetails$.next(result);
          this.authService.applicationAuthUserImageUrlUserIdGet(this.UserID).subscribe((result) => {
            if (typeof result === 'string') {
              this.UserImageUrl$.next(result);
            }
          });
        }, (error) => { 
          console.error('applicationSettingUserDetailsUserIdGet error : ', error);
          
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

  Register(email: string, password: string, confirmPassword: string): Promise<boolean>{
     const success = new Subject<boolean>();
    this.authService.applicationAuthRegisterPost({ email: email, password: password }).subscribe((result) => {
      console.log('applicationAuthRegisterPost ', result);
      this.Login(email, password).then((res) => { success.next(res); });
    }, (error) => { console.error("Register error 1 : ", error); success.next(false);});
    
    return firstValueFrom(success);
  }

  public Login(userName: string, password: string): Promise<boolean> {
    const success = new Subject<boolean>();
    console.log('Login start  ', { userName: userName, password: password });
    this.authService.applicationAuthLoginPost({ userName: userName, password: password }).subscribe((result) => {
      console.log('applicationAuthLoginPost ', result);
      if (!result) {
        console.error('Login fail : Unknown error');
        success.next(false);
        return;
      }
      if (!result.isSuccess) {
        console.error("Login fail : ", result.failMessage || 'Unknown error');
        success.next(false);
        return;
      }

      this.UserId = result.userID || '';
      this.Bearer = result.token || '';
      success.next(this.IsAuthenticated);
      
    }, (error) => {
      console.error("Login error : ", error);
      success.next(false);
      return;
    });
    return firstValueFrom(success);
  }
}


