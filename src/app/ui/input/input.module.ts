import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class InputModule {}
