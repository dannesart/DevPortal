import { FormsModule } from '@angular/forms';
import { PreferenceAvatarComponent } from './avatar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PreferenceAvatarComponent],
  exports: [PreferenceAvatarComponent],
})
export class PreferenceAvatarModule {}
