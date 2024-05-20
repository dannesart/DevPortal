import { HttpClient } from '@angular/common/http';
import { IEmulator } from 'src/app/models/emulator';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConsoleEventTypes, IConsoleEvent } from 'src/app/models/console';
import { v4 as uuidv4 } from 'uuid';
import { DemoRequestMethods, DemoService } from 'src/app/services/demo.service';
import { countries } from 'countries-list';
import { ApiEndpoints, ApiHost } from 'src/app/constants/api';

interface BanksResult {
  status: string;
  banks: any[];
}

@Component({
  selector: 'demo-sendmoney',
  templateUrl: './sendmoney.component.html',
  styleUrls: ['./sendmoney.component.scss'],
})
export class SendMoneyComponent implements OnInit {
  public waiting = false;
  public authorized = false;
  public showRestart = false;
  public allowSeamless = true;
  public showTransaction = false;
  public transactionAmount = 0;
  public showCurrencyPicker = false;
  public transactionError: string | null = null;
  public countries = countries;
  public recipientCountry: any = 'Select recipient country';
  public walletOrPeyyaId: any;
  public iban: any;

  @Input() config: IEmulator | undefined;
  @Output('consoleEvent') consoleEvent: EventEmitter<IConsoleEvent> =
    new EventEmitter<IConsoleEvent>();

  constructor(public http: HttpClient, public demo: DemoService) {}

  public maxOut = () => (this.transactionAmount = this.demo.balance);

  public cancelTransaction = () => {
    this.showTransaction = false;
  };

  public openTransferModal = ($event: Event) => {
    $event.preventDefault();
    this.showTransaction = true;
  };

  public verifyTransaction = async (transactionId: string) => {
    const transactionVerifyEvent: IConsoleEvent = {
      message: 'Verifying Transaction',
      type: ConsoleEventTypes.waiting,
      id: uuidv4(),
      data: {
        transactionId,
      },
    };

    this.consoleEvent.emit(transactionVerifyEvent);

    return Promise.resolve(setTimeout(() => {}, 2000));
  };

  public verifyBalance = async (transactionId: string) => {
    const transactionVerifyEvent: IConsoleEvent = {
      message: 'Verifying Balance',
      type: ConsoleEventTypes.waiting,
      id: uuidv4(),
      data: {
        transactionId,
      },
    };

    this.consoleEvent.emit(transactionVerifyEvent);

    return Promise.resolve(setTimeout(() => {}, 2000));
  };

  public transaction = async ($event: Event) => {
    $event.preventDefault();
    const curreny = this.demo.currency.code;
    const transactionId = uuidv4();
    const allowSeamless = this.demo.getStateProp('allowSeamless');
    this.transactionError = null;

    if (this.transactionAmount <= 0) {
      this.transactionError = 'Amount can´t be equal or lower than 0';
      setTimeout(() => {
        this.transactionError = null;
      }, 5000);
      return;
    }
    if (this.transactionAmount > this.demo.balance) {
      if (!allowSeamless) {
        this.transactionError =
          'Not enough in balance. Make sure it´s toped up or allow seamless transfers';
        setTimeout(() => {
          this.transactionError = null;
        }, 5000);
        return;
      }
      await this.verifyBalance(transactionId);
    }

    const transactionInitEvent: IConsoleEvent = {
      message: 'Init Transaction',
      type: ConsoleEventTypes.waiting,
      id: uuidv4(),
      data: {
        amount: this.transactionAmount,
        curreny,
        type: this.demo.getStateProp('transactionType'),
        target:
          this.demo.getStateProp('transactionType') === 'peyya'
            ? this.walletOrPeyyaId
            : this.iban,
      },
    };

    this.consoleEvent.emit(transactionInitEvent);

    const request = new Promise((resolve, rejects) => {
      this.demo.request({
        method: DemoRequestMethods.POST,
        endpoint: `${ApiHost}${ApiEndpoints.transactions}/send`,
        headers: {
          Authorization:
            `Bearer ${this.demo.getStateProp('token')}` || '',
        },
      }).subscribe((response) => {
        if(response){
          return resolve(response);
        }
        rejects();
      });
      
    })

    const response = await request;

    this.showTransaction = false;
    this.waiting = true;

    await this.verifyTransaction(transactionId);

    setTimeout(() => {
      this.waiting = false;
      this.demo.setBalance(this.demo.balance - this.transactionAmount);

      const transactionCompleteEvent: IConsoleEvent = {
        message: 'Transaction completed',
        type: ConsoleEventTypes.success,
        id: uuidv4(),
        data: {
          transactionId,
          amount: this.transactionAmount,
          curreny,
          balance: this.demo.balance,
          type: this.demo.getStateProp('transactionType'),
          target:
            this.demo.getStateProp('transactionType') === 'peyya'
              ? this.walletOrPeyyaId
              : this.iban,
        },
      };

      this.consoleEvent.emit(transactionCompleteEvent);

      this.transactionAmount = 0;
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
      message: 'Send money demo just started',
      type: ConsoleEventTypes.init,
      id: uuidv4(),
    };

    this.consoleEvent.emit(initEvent);
  }
}
