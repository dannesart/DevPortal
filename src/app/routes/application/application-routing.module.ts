import { ApiGuideComponent } from './../../ui/api-guide/api-guide.component';
import { ApplicationComponent } from './application.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationSections } from 'src/app/constants/sections';
import { ISection } from 'src/app/models/sections';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'general',
  },
  {
    path: ':section',
    component: ApplicationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
