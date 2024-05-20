export enum InputType {
  text = 'text',
  checkbox = 'checkbox',
  country = 'country',
  select = 'select',
  number = 'number',
  phone = 'phone',
  email = 'email',
  password = 'password',
  numberValidation = 'numberValidation',
}
export enum InputTheme {
  dark = 'dark',
  light = 'light',
}

export interface InputOption {
  value: any;
  text: string;
}

export interface IInput {
  type: InputType;
  id?: string;
  initValue?: any;
  options?: InputOption[] | any[];
  required?: boolean;
  disabled?: boolean;
  name?: string;
  label?: string;
  subLabel?: string;
  theme?: InputTheme;
  hidden?: boolean;
  isLast?: boolean;
  placeholder?: string;
}
