export * from './auth.service';
import { AuthService } from './auth.service';
export * from './dashboard.service';
import { DashboardService } from './dashboard.service';
export * from './pOS.service';
import { POSService } from './pOS.service';
export * from './setting.service';
import { SettingService } from './setting.service';
export * from './wallet.service';
import { WalletService } from './wallet.service';
export const APIS = [AuthService, DashboardService, POSService, SettingService, WalletService];
