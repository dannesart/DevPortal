export enum CodeTypes {
  ts = 'typescript',
  json = 'JSON',
}

export enum CodeStyles {
  default = 'default',
}

export interface ICode {
  type: CodeTypes;
  style?: CodeStyles;
  snippet: string;
  showLines?: boolean;
}
