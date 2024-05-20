import { DemoModule } from './../demo/demo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmulatorComponent } from './emulator.component';

@NgModule({
  imports: [CommonModule, DemoModule],
  declarations: [EmulatorComponent],
  exports: [EmulatorComponent],
})
export class EmulatorModule {}
