import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { asideRoutes } from 'src/app/constants/routes';
import { IRoute } from 'src/app/models/route';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: asideRoutes[0].path,
  },
  ...asideRoutes.map((r: IRoute) => {
    if (!r.external || r.module) {
      const moduleName = r.module.charAt(0).toUpperCase() + r.module.slice(1);
      const fullName = `${moduleName}Module`;
      return {
        path: r.path,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(`src/app/routes/${r.module}/${r.module}.module`).then(
            (m) => m[fullName]
          ),
      };
    }
    return {
      path: r.path,
      redirectTo: '/',
    };
  }),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContainerRoutingModule {}
