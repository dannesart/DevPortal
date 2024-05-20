import { ISection } from '../models/sections';

export const ApplicationSections: ISection[] = [
  {
    name: 'general',
    module: 'configs',
    moduleName: 'ConfigsModule',
    path: 'general',
  },
  {
    name: 'api',
    path: 'api',
    module: 'api-guide',
    moduleName: 'ApiGuideModule',
  },
];
