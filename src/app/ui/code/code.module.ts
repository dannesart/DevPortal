import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './code.component';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [CommonModule, HighlightModule],
  declarations: [CodeComponent],
  exports: [CodeComponent],
})
export class CodeModule {}
