import { InputType } from 'src/app/models/ui.input';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEmulator } from 'src/app/models/emulator';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConsoleEventTypes, IConsoleEvent } from 'src/app/models/console';
import { v4 as uuidv4 } from 'uuid';
import { catchError, throwError } from 'rxjs';
import { DemoRequestMethods, DemoService } from 'src/app/services/demo.service';
import { ApiEndpoints, ApiHost } from 'src/app/constants/api';

@Component({
  selector: 'demo-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss'],
})
export class KYCComponent implements OnInit {
  public userFirstName: any = null;
  public userLastName: any = null;
  public accountError = '';
  public waiting = false;
  public complete = false;
  public inputType = InputType;
  @Input() config: IEmulator | undefined;
  @Output('consoleEvent') consoleEvent: EventEmitter<IConsoleEvent> =
    new EventEmitter<IConsoleEvent>();

  constructor(public http: HttpClient, public demo: DemoService) {}

  private handleError = (error: HttpErrorResponse) => {
    return throwError(() => {
      console.error(error);
      this.waiting = false;
      const creatingErrorEvent: IConsoleEvent = {
        message: 'Error while creating account',
        type: ConsoleEventTypes.error,
        id: uuidv4(),
        data: {
          error,
        },
      };

      this.consoleEvent.emit(creatingErrorEvent);
    });
  };

  public start = async () => {
    const endpoint =
      this.config?.config?.ApiEndpoints?.['user'] + '/kyc-by-url';
    const host = this.config?.config?.ApiHost;
    const full = `${host}${endpoint}`;
    this.waiting = true;
    const creatingEvent: IConsoleEvent = {
      message: 'Init KYC',
      type: ConsoleEventTypes.apiCall,
      id: uuidv4(),
    };

    this.consoleEvent.emit(creatingEvent);

    const request = new Promise((resolve, rejects) => {
      this.demo.request({
        method: DemoRequestMethods.GET,
        endpoint: `${ApiHost}${ApiEndpoints.user}/kyc-by-url`,
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

    const a = await request;
    debugger;
  };

  public restart = ($event: Event) => {
    $event.preventDefault();
    this.complete = false;
    const restart: IConsoleEvent = {
      message: 'Restarting',
      type: ConsoleEventTypes.restart,
      id: uuidv4(),
    };

    this.consoleEvent.emit(restart);

    this.start();
  };

  ngOnInit() {
    const initEvent: IConsoleEvent = {
      message: 'KYC demo just started',
      type: ConsoleEventTypes.init,
      id: uuidv4(),
    };

    this.consoleEvent.emit(initEvent);

    this.start()
  }
}
