import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";
import { FullUserDto, SettingService } from '../../Services/server-api';
import { GlobalGetUserId, InitServiceConfig } from '../../app.component';
import { BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
    selector: 'app-setting-page',
    standalone: true,
    templateUrl: './setting-page.component.html',
    styleUrl: './setting-page.component.css',
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatExpansionModule,
        ReactiveFormsModule,
        FormsModule,
        NavigationBarComponent]
})
export class SettingPageComponent implements OnInit {

    waiting: boolean = false;
    userDetail$: BehaviorSubject<FullUserDto> = new BehaviorSubject<FullUserDto>({});
    user: FullUserDto = {};
    startAt: Date;
    userDetailForm: FormGroup;
     
    constructor(private setting: SettingService, private formBuilder: FormBuilder, private authService: AuthServiceService, private router: Router) {
        InitServiceConfig(setting.configuration);
        this.userDetailForm = this.formBuilder.group({
            firstNameCtrl: [''],
            lastNameCtrl: [''],
            emailCtrl: [''],
            phoneNumberCtrl: [''],
            addressCtrl: [''],
            birthDateCtrl: ['01/01/1990'],
            cityCtrl: [''],
            countryCtrl: [''],
        });
        this.userDetail$.subscribe((data) => {
            this.user = data;
        });

        this.startAt = new Date(1990, 0, 1);
    }
    ngOnInit(): void {
        this.setting.applicationSettingUserDetailsUserIdGet(GlobalGetUserId()).subscribe((data) => {
            console.log('SettingPageComponent data: ', data);
            if (data.birthDate) {
                data.birthDate = data.birthDate.split('T')[0];
                if (data.birthDate === '0001-01-01') {
                    data.birthDate = null;
                }
            }
            this.userDetail$.next(data);
        });
    }

    updateUser() {
        this.waiting = true;
        console.log('updateUser', this.user);
        this.setting.applicationSettingUserDetailsPut(this.user).subscribe((data) => {
            console.log('updateUser data: ', data);
            this.userDetail$.next(data);
            this.waiting = false;
        });
    }
    deleteUser() {
        var currentUserId = GlobalGetUserId();
        this.setting.applicationSettingUserDetailsUserIdDelete(currentUserId).subscribe((data) => {
            console.log('deleteUser data: ', data);
            if (currentUserId === data) {
                this.authService.Logout().then((result) => {
                    console.log('Logout result: ', result);
                    this.router.navigate(['/']);
                });
            }
            else {
                console.warn('deleteUser failed: ', data);
            }
        }, (error) => {console.warn('deleteUser failed: ', error);});

        this.authService.Logout().then((result) => {
            console.log('Logout result: ', result);
            this.router.navigate(['/']);
        });
    }
}
