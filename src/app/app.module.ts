import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpirationDateMaskDirective } from './components/expiration-date-mask.directive';
 



@NgModule({
  declarations: [ExpirationDateMaskDirective],
  imports: [
    CommonModule
  ]
  
})
export class AppModule { }
