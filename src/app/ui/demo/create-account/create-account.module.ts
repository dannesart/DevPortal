import { InputModule } from 'src/app/ui/input/input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, InputModule],
  declarations: [CreateAccountComponent],
  exports: [CreateAccountComponent],
})
export class CreateAccountModule {}
