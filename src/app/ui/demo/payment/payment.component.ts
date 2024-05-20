import { IEmulator } from 'src/app/models/emulator';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConsoleEventTypes, IConsoleEvent } from 'src/app/models/console';
import { v4 as uuidv4 } from 'uuid';
import { DemoService } from 'src/app/services/demo.service';
import { PaymentMock } from 'src/app/mocks/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  public waiting = false;
  public authorized = false;
  public showRestart = false;
  public transferAmount = 0;
  public showCurrencyPicker = false;
  public paymentMock = PaymentMock;
  public showConfirmation = false;

  @Input() config: IEmulator | undefined;
  @Output('consoleEvent') consoleEvent: EventEmitter<IConsoleEvent> =
    new EventEmitter<IConsoleEvent>();

  constructor(public demoService: DemoService) {}

  public pay = ($event: Event) => {
    $event.preventDefault();
    this.waiting = true;
    const sendingPayment: IConsoleEvent = {
      message: 'Executing payment',
      type: ConsoleEventTypes.apiCall,
      id: uuidv4(),
    };

    this.consoleEvent.emit(sendingPayment);

    setTimeout(() => {
      const sendingPaymentComplete: IConsoleEvent = {
        message: 'Payment complete',
        type: ConsoleEventTypes.success,
        id: uuidv4(),
      };
      this.showConfirmation = true;
      this.waiting = false;
      this.showRestart = true;
      this.consoleEvent.emit(sendingPaymentComplete);
    }, 2000);
  };

  public restart = ($event: Event) => {
    $event.preventDefault();
    this.waiting = false;
    this.showRestart = false;
    this.showConfirmation = false;
    const restart: IConsoleEvent = {
      message: 'Restarting',
      type: ConsoleEventTypes.restart,
      id: uuidv4(),
    };

    this.consoleEvent.emit(restart);
  };

  async ngOnInit() {
    const initEvent: IConsoleEvent = {
      message: 'Payment demo just started',
      type: ConsoleEventTypes.init,
      id: uuidv4(),
    };

    this.consoleEvent.emit(initEvent);
  }
}
