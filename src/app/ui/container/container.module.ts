import { ContainerComponent } from './container.component';
import { ContainerRoutingModule } from './container-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideModule } from '../aside/aside.module';
import { HeaderModule } from '../header/header.module';
import { UsersModule } from 'src/app/routes/users/users.module';
import { ApplicationsModule } from 'src/app/routes/applications/applications.module';
import { PreferencesModule } from 'src/app/routes/preferences/preferences.module';
import { DocsModule } from 'src/app/routes/docs/docs.module';

@NgModule({
  imports: [
    CommonModule,
    ContainerRoutingModule,
    AsideModule,
    HeaderModule,
    UsersModule,
    ApplicationsModule,
    PreferencesModule,
    DocsModule,
  ],
  declarations: [ContainerComponent],
  exports: [ContainerComponent],
})
export class ContainerModule {}
