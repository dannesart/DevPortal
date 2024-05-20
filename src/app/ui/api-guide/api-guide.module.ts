import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiGuideComponent } from './api-guide.component';
import { EmulatorModule } from '../emulator/emulator.module';
import { CodeModule } from '../code/code.module';
import { SectionInFocusDirective } from 'src/app/directives/section-in-focus.directive';
@NgModule({
  imports: [CommonModule, EmulatorModule, CodeModule, RouterModule],
  declarations: [ApiGuideComponent, SectionInFocusDirective],
  exports: [ApiGuideComponent],
})
export class ApiGuideModule {}
