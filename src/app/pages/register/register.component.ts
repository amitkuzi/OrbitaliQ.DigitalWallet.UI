import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,MatInputModule, MatIconModule, MatDividerModule,MatSnackBarModule, FormsModule ,ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

   hidePAssword: boolean = true;
  registrationForm!: FormGroup<any>;

  constructor(
    private authService: AuthServiceService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router) {
    console.log('LoginComponent constructor called IsAuthenticated: ', this.authService.IsAuthenticated);
  }

 ngOnInit(): void {
     this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

    passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl?.value === confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors(null);
    } else {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    }
  }

  Register() {
    this.authService.Register(this.email?.value, this.password?.value, this.confirmPassword?.value). then((res) => {
        console.log("Register 2: ", res);
        if (this.authService.IsAuthenticated) { this.router.navigate(['/home'], { replaceUrl: true }); }
        else {
          this.snackBar.open(`Register Failed: ${res}`, 'Close', { duration: 4000 });
        }
      }).
      catch((err) => {
         this.snackBar.open(`Register Failed 2${err.message}`, 'Close', { duration: 4000 });
      });
    
  }
}
