import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AuthService } from './server-api/api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  readonly _bearerKey = 'Bearer';
  readonly _userIdKey = 'userId';
  constructor(
    private authService: AuthService,
  ) {
    this.Bearer$.next(this.Bearer);
  }

  public Bearer$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public set Bearer(value: string) {
    localStorage.setItem(this._bearerKey, value);
    this.Bearer$.next(value);
  }
  public get Bearer(): string {
    return localStorage.getItem(this._bearerKey) || '';
  }

  public get UserID(): string {
    return localStorage.getItem(this._userIdKey) || '';
  }


  public get IsAuthenticated(): boolean {
    return !!this.Bearer;
  }

  public Logout(): Promise<boolean> {
    localStorage.removeItem(this._bearerKey);
    localStorage.removeItem(this._userIdKey);
    return Promise.resolve(true);
  }

  public Login(userName: string, password: string): Promise<boolean> {
    const success = new BehaviorSubject<boolean>(false);
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
      }
      this.Bearer = result.token || '';
      localStorage.setItem(this._userIdKey, result.userID || '');
      success.next(true);
    }, (error) => {
      console.error("Login fail : ", error);
      success.next(false);
    });
    return firstValueFrom(success);
  }
}
