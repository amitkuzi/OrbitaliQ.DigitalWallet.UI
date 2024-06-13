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
    get userDetail$(): BehaviorSubject<FullUserDto| undefined> { return this.authService.UserDetails$;  } 
    
    user: FullUserDto = {};
    startAt: Date;
    userDetailForm: FormGroup;
     
    constructor( private formBuilder: FormBuilder, private authService: AuthServiceService, private router: Router) {
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
            this.user = data ?? {};
        });

        this.startAt = new Date(1990, 0, 1);
    }

    ngOnInit(): void {

    }

    updateUser() {
        this.waiting = true;
        console.log('updateUser', this.user);
        this.authService.UpdateUser(this.user).then((result) => {
            this.waiting = false;
        });
    }

    deleteUser() {
        const result = window.confirm('Are you sure you want to delete your account?');
        if (result) {
            console.log('User clicked OK');
            this.authService.deleteUser().then((result) => { 
                if (result) {
                    console.log('deleteUser result: ', result);
                    this.router.navigate(['/']);
                }
            });
        }
    }
}
