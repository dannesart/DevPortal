import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEmulator } from 'src/app/models/emulator';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConsoleEventTypes, IConsoleEvent } from 'src/app/models/console';
import { catchError, throwError, Subscription, BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { DemoRequestMethods, DemoService } from 'src/app/services/demo.service';
import { ApiEndpoints, ApiHost } from 'src/app/constants/api';
import { WalletService } from 'src/app/services/wallet.service';

interface BanksResult {
  status: string;
  banks: any[];
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  public waiting = false;
  public authorized = false;
  public showRestart = false;
  public allowSeamless = this.demoService.getStateProp('allowSeamless');
  public showTransfer = false;
  public transferAmount = 0;
  public showCurrencyPicker = false;
  public transferError: string | null = null;
  public error$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public wallet$ = this.demoService.getStateProp$("wallet");

  @Input() config: IEmulator | undefined;
  @Output('consoleEvent') consoleEvent: EventEmitter<IConsoleEvent> =
    new EventEmitter<IConsoleEvent>();

  constructor(public demoService: DemoService, public wallet: WalletService) {}

  public cancelTransfer = () => {
    this.showTransfer = false;
  };

  public openTransferModal = ($event: Event) => {
    $event.preventDefault();
    this.showTransfer = true;
  };

  public toggleSeamlessTransfer = () => {
    const allowSeamless = this.demoService.getStateProp('allowSeamless');
    this.demoService.updateState({ allowSeamless: !allowSeamless });
    this.allowSeamless = !allowSeamless;
  };

  public transfer = ($event: Event) => {
    $event.preventDefault();
    this.transferError = null;

    if (this.transferAmount <= 0) {
      this.transferError = 'Amount can´t be equal or lower than 0';
      return;
    }

    const transferInitEvent: IConsoleEvent = {
      message: 'Init transfer',
      type: ConsoleEventTypes.waiting,
      id: uuidv4(),
      data: {
        amount: this.transferAmount,
      },
    };

    this.consoleEvent.emit(transferInitEvent);

    this.showTransfer = false;
    this.waiting = true;
    setTimeout(() => {
      this.waiting = false;
      this.demoService.setBalance(
        this.demoService.balance + this.transferAmount
      );

      const transferCompleteEvent: IConsoleEvent = {
        message: 'Transfer completed',
        type: ConsoleEventTypes.success,
        id: uuidv4(),
        data: {
          transfered: this.transferAmount,
          balance: this.demoService.balance,
        },
      };

      this.consoleEvent.emit(transferCompleteEvent);

      this.transferAmount = 0;
    }, 1000);
  };

  public restart = ($event: Event) => {
    $event.preventDefault();
    this.waiting = false;
    this.showRestart = false;
    const restart: IConsoleEvent = {
      message: 'Restarting',
      type: ConsoleEventTypes.restart,
      id: uuidv4(),
    };

    this.consoleEvent.emit(restart);
  };

  async ngOnInit() {
    const initEvent: IConsoleEvent = {
      message: 'Wallet demo just started',
      type: ConsoleEventTypes.init,
      id: uuidv4(),
    };

    this.consoleEvent.emit(initEvent);

    if (!this.demoService.getStateProp('token')) {
      this.error$.next('You need to be authenticated first. Then try again.');
      this.showRestart = true;
      return;
    }
    try {
      await this.wallet.getWallet();
      
    } catch (error) {
      this.error$.next('Problem getting wallet. Please try again.');
      this.showRestart = true;
    }
  }
}
