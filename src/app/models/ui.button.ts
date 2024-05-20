export enum ButtonTheme {
  primary = 'primary',
  secondary = 'secondary',
  error = 'error',
  disabled = 'disabled',
  light = 'light',
  dark = 'dark',
  transparent = 'transparent',
}

export const ButtonThemeClasses = {
  [ButtonTheme.primary]:
    'px-8 py-4 rounded-xl bg-purple-500 text-white uppercase font-bold hover:shadow-xl',
  [ButtonTheme.secondary]:
    'px-8 py-4 rounded-xl bg-green-500 text-white uppercase font-bold hover:shadow-xl',
  [ButtonTheme.disabled]:
    'px-8 py-4 rounded-xl bg-slate-400 text-black uppercase font-bold hover:shadow-xl',
  [ButtonTheme.light]:
    'px-8 py-4 rounded-xl w-full uppercase font-bold hover:shadow-xl bg-slate-100 text-slate-600',
  [ButtonTheme.dark]:
    'px-8 py-4 rounded-xl w-full uppercase font-bold hover:shadow-xl bg-slate-600 text-white',
  [ButtonTheme.error]:
    'px-8 py-4 rounded-xl bg-rose-500 text-white uppercase font-bold hover:shadow-xl',
  [ButtonTheme.transparent]:
    'px-8 py-4 rounded-xl w-full bg-transparent text-slate-600 dark:text-white uppercase font-bold hover:shadow-xl',
};
