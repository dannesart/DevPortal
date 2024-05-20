import { ApplicationsComponent } from './applications.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    pathMatch: 'full',
  },
  {
    path: ':applicationId',
    loadChildren: () =>
      import('src/app/routes/application/application.module').then(
        (m) => m.ApplicationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
