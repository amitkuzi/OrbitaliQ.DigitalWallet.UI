import { Injectable } from '@angular/core';
import { SettingService } from './server-api/api/setting.service';
import { AuthServiceService } from './auth-service.service';
import { BehaviorSubject } from 'rxjs';
import { FullUserDto } from './server-api/model/fullUserDto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userDetails: FullUserDto | undefined;

  constructor(private settingService: SettingService, private authService: AuthServiceService) { }

  public get UserLable(): BehaviorSubject<string> {
    if (this.authService.IsAuthenticated) {
      this.settingService.applicationSettingUserDetailsUserIdGet(this.authService.UserID).subscribe((result) => {
        this.userDetails = result;
        return new BehaviorSubject<string>(`{result.}` || '');
      });
    }
    return new BehaviorSubject<string>('');
  }

  public get UserImageUrl(): BehaviorSubject<string> {

    if (this.authService.IsAuthenticated) {
      this.settingService.applicationSettingUserDetailsUserIdGet(this.authService.UserID).subscribe((result) => {
        this.userDetails = result;
        return new BehaviorSubject<string>(result || '');
      });
    }
    return new BehaviorSubject<string>('');
  }
}
