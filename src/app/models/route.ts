export interface IRoute {
  name: string;
  label: string;
  path: string;
  external: boolean;
  show: boolean;
  module?: any;
}
