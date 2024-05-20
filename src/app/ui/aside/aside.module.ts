import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [AsideComponent],
  exports: [AsideComponent],
})
export class AsideModule {}
