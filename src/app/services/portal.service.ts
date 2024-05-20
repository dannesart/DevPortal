import { BehaviorSubject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PortalService implements OnDestroy {
  /**
   * Behavior subjects / consts
   */
  private _apiStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  public getApiStatus$ = () => {
    return this._apiStatus.asObservable();
  };

  public updateApiStatus = (value: boolean) => {
    this._apiStatus.next(value);
  };

  constructor() {}

  ngOnDestroy(): void {}
}
