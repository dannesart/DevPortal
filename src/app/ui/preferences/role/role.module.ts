import { FormsModule } from '@angular/forms';
import { PreferenceRoleComponent } from './role.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputModule } from '../../input/input.module';

@NgModule({
  imports: [CommonModule, FormsModule, InputModule],
  declarations: [PreferenceRoleComponent],
  exports: [PreferenceRoleComponent],
})
export class PreferenceRoleModule {}
