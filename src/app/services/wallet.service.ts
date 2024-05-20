import {
  DemoRequest,
  DemoRequestMethods,
  DemoService,
} from 'src/app/services/demo.service';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ApiEndpoints, ApiHost } from '../constants/api';
import { IWallet } from '../models/wallet';

@Injectable({
  providedIn: 'root',
})
export class WalletService implements OnInit, OnDestroy {

  public getWallet = async () => {
    // Define wallet GET request
    const request: DemoRequest = {
      method: DemoRequestMethods.GET,
      endpoint: `${ApiHost}${ApiEndpoints.wallet}`,
      headers: {
        Authorization: `Bearer ${this.demo.getStateProp('token')}` || '',
      },
    };
    // Get wallet and store it to state
    this.demo.request<{ status: string, balance: string, wallet: IWallet }>(request).subscribe((response) => {
      const { wallet } = response;
      this.demo.updateState({ wallet })
    });
  };

  constructor(public demo: DemoService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
