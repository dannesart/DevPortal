import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { DocsRoutingModule } from './docs-routing.module';

@NgModule({
  imports: [CommonModule, DocsRoutingModule],
  declarations: [DocsComponent],
})
export class DocsModule {}
