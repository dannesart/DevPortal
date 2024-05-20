import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendMoneyComponent } from './sendmoney.component';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule],
  declarations: [SendMoneyComponent],
  exports: [SendMoneyComponent],
})
export class SendMoneyModule {}
