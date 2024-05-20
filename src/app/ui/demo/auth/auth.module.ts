import { InputModule } from 'src/app/ui/input/input.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, InputModule],
  declarations: [AuthComponent],
  exports: [AuthComponent],
})
export class AuthModule {}
