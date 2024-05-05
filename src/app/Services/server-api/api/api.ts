export * from './cardPayment.service';
import { CardPaymentService } from './cardPayment.service';
export * from './orders.service';
import { OrdersService } from './orders.service';
export * from './paymentMethod.service';
import { PaymentMethodService } from './paymentMethod.service';
export const APIS = [CardPaymentService, OrdersService, PaymentMethodService];
