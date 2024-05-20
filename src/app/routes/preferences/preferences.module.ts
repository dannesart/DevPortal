import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesComponent } from './preferences.component';
import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferenceRoleModule } from 'src/app/ui/preferences/role/role.module';
import { PreferenceAvatarModule } from 'src/app/ui/preferences/avatar/avatar.module';

@NgModule({
  imports: [CommonModule, PreferencesRoutingModule, PreferenceRoleModule, PreferenceAvatarModule],
  declarations: [PreferencesComponent],
})
export class PreferencesModule {}
