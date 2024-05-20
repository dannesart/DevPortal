import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export enum Theme {
  dark = 'dark',
  light = 'light',
}

@Injectable({
  providedIn: 'root',
})
export class UiService {
  public mainScrollPos = new BehaviorSubject<any>({});
  public sectionInView = new BehaviorSubject<any>(null);

  public getTheme = (): Theme => {
    const currentTheme = localStorage.getItem('theme');
    return currentTheme as Theme;
  };

  public toggleTheme = (theme: Theme) => {
    const currentTheme = this.getTheme();
    if (currentTheme) {
      document.documentElement.classList.remove(currentTheme);
    }
    localStorage.setItem('theme', theme);
    document.documentElement.classList.add(theme);
  };

  public isDarkPrefered = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  constructor() {
    if (!this.getTheme()) {
      if (this.isDarkPrefered()) {
        this.toggleTheme(Theme.dark);
      } else {
        this.toggleTheme(Theme.light);
      }
    } else {
      this.toggleTheme(this.getTheme());
    }
  }
}
