import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PaymentComponent],
  exports: [PaymentComponent],
})
export class PaymentModule {}
