import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule],
  declarations: [WalletComponent],
  exports: [WalletComponent],
})
export class WalletModule {}
