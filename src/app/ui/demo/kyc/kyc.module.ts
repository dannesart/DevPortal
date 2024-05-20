import { InputModule } from 'src/app/ui/input/input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KYCComponent } from './kyc.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, InputModule],
  declarations: [KYCComponent],
  exports: [KYCComponent],
})
export class KYCModule {}
