import { Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { WalletPageComponent } from './pages/wallet-page/wallet-page.component';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';

export const routes: Routes = [

    { path: 'welcome', component: WelcomePageComponent },
    { path: 'home', component: HomeComponent },
    { path: 'wallet', component: WalletPageComponent },
    { path: 'payment', component: PaymentPageComponent },
    { path: 'setting', component: SettingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', }
];