import { IRoute } from 'src/app/models/route';

export const asideRoutes: IRoute[] = [
  {
    name: 'applications',
    label: 'Applications',
    path: 'applications',
    show: true,
    external: false,
    module: 'applications',
  },
  {
    name: 'docs',
    label: 'Docs',
    path: 'docs',
    show: true,
    external: false,
    module: 'docs',
  },
  {
    name: 'coop',
    label: 'Co-op',
    path: 'coop',
    show: true,
    external: false,
    module: 'users',
  },
  {
    name: 'preferences',
    label: 'Preferences',
    path: 'preferences',
    show: true,
    external: false,
    module: 'preferences',
  },
];
