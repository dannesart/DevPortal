import { CreateAccountModule } from './create-account/create-account.module';
import { DemoComponent } from './demo.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { BanksModule } from './banks/banks.module';
import { WalletModule } from './wallet/wallet.module';
import { PaymentModule } from './payment/payment.module';
import { SendMoneyModule } from './send-money/sendmoney.module';
import { KYCModule } from './kyc/kyc.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    CreateAccountModule,
    BanksModule,
    WalletModule,
    PaymentModule,
    SendMoneyModule,
    KYCModule
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent],
})
export class DemoModule {}
