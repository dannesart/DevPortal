import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, Subscription, BehaviorSubject, Observable, filter, find, map } from 'rxjs';
import { ApiEndpoints, ApiHost } from '../constants/api';
import { currencies, walletBalance } from '../constants/demo';
import { countries } from 'countries-list';

export enum DemoRequestMethods {
  POST = 'post',
  GET = 'get',
  PATCH = 'patch',
}

export interface DemoRequest {
  method: DemoRequestMethods;
  endpoint: string;
  headers?: any;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class DemoService implements OnDestroy {
  public currency = currencies[0];
  public currencies = currencies;
  public balance = walletBalance;
  public countries = countries;

  /**
   * Demo state.
   * This will handle all data for all the demos.
   */
  private _state$: BehaviorSubject<{ [key: string]: any }> =
    new BehaviorSubject<{ [key: string]: any }>({
      transactionType: 'peyya',
      allowSeamless: true,
    });

  public getState = () => this._state$.asObservable();
  public getStateProp = (key: string) => this._state$.value[key];
  public getStateProp$ = (key: string) => this._state$.asObservable().pipe(map((_state) => {
    return _state[key]
  }));
  public updateState = (patch: any) =>
    this._state$.next({ ...this._state$.value, ...patch });
  public clearState = () => this._state$.next({});

  /**
   * Save state prop
   */
  public saveStateProp = (key: string, value: any) =>
    localStorage.setItem(`state_prop_${key}`, JSON.stringify(value));
  public loadStateProp = (key: string) =>
    this.updateState({
      [key]: JSON.parse(localStorage.getItem(`state_prop_${key}`) || 'null'),
    });
  public deleteStateProp = (key: string) =>
    localStorage.removeItem(`state_prop_${key}`);

  /**
   * Update methods for demos that needs to set currency and balance.
   * These will update the demo state.
   */

  public setCurrency = (idx: number) => {
    /**
     * TODO: Remove the global state and only use updateState
     */
    this.currency = this.currencies[idx];
    this.updateState({ currency: this.currency });
  };
  public setBalance = (amount: number) => {
    /**
     * TODO: Remove the global state and only use updateState
     */
    this.balance = amount;
    this.updateState({ balance: this.balance });
  };

  /**
   * Request. Here we define demo request. These are a little different from "normal" request.
   * These will use demo state auth token.
   *
   */

  private handleError = (error: HttpErrorResponse) => {
    return throwError(() => {
      console.error(error);
    });
  };

  public request = <T>(config: DemoRequest) => {
    switch (config.method) {
      case DemoRequestMethods.GET:
        return this.http.get(config.endpoint, { headers: config.headers }) as Observable<T>;
      case DemoRequestMethods.POST:
        return this.http.post(config.endpoint, config.data, {
          headers: config.headers,
        }) as Observable<T>;
      case DemoRequestMethods.PATCH:
        return this.http.patch(config.endpoint, config.data, {
          headers: config.headers,
        }) as Observable<T>;
    }
  };

  ngOnDestroy() {}

  constructor(public http: HttpClient, public router: Router) {}
}
