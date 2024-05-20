import { InputType } from 'src/app/models/ui.input';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEmulator } from 'src/app/models/emulator';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConsoleEventTypes, IConsoleEvent } from 'src/app/models/console';
import { v4 as uuidv4 } from 'uuid';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  public userFirstName: any = null;
  public userLastName: any = null;
  public accountError = '';
  public waiting = false;
  public complete = false;
  public inputType = InputType;
  @Input() config: IEmulator | undefined;
  @Output('consoleEvent') consoleEvent: EventEmitter<IConsoleEvent> =
    new EventEmitter<IConsoleEvent>();

  constructor(public http: HttpClient) {}

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

  public creating = () => {
    const endpoint =
      this.config?.config?.ApiEndpoints?.['user'] + '/testuserid';
    const host = this.config?.config?.ApiHost;
    const full = `${host}${endpoint}`;
    this.waiting = true;
    const creatingEvent: IConsoleEvent = {
      message: 'Completing account ...',
      type: ConsoleEventTypes.apiCall,
      id: uuidv4(),
      data: {
        url: full,
        firstName: this.userFirstName,
        lastName: this.userLastName,
      },
    };

    this.consoleEvent.emit(creatingEvent);

    this.http
      .patch(full, {
        firstName: this.userFirstName,
        lastName: this.userLastName,
      })
      .pipe(catchError(this.handleError))
      .subscribe((data) => {
        this.complete = true;
        this.waiting = false;
        const accountDone: IConsoleEvent = {
          message: 'Account complete',
          type: ConsoleEventTypes.success,
          id: uuidv4(),
          data,
        };
        this.consoleEvent.emit(accountDone);
      });
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
  };

  public handleClick = ($event: Event) => {
    $event.preventDefault();
    this.accountError = '';
    if (this.userFirstName && this.userLastName) {
      this.creating();
    } else {
      this.accountError = 'Missing first and/or last name';
    }
  };

  public handleInputError = (error: string, key: string) => {
    switch (key) {
      case 'userLastName':
        this.accountError = error;
        break;
    }
  };
  public handleInputChange = (value: string, key: string) => {
    switch (key) {
      case 'userFirstName':
        this.userFirstName = value;
        break;
      case 'userLastName':
        this.userLastName = value;
        break;
    }
  };

  ngOnInit() {
    const initEvent: IConsoleEvent = {
      message: 'Complete account demo just started',
      type: ConsoleEventTypes.init,
      id: uuidv4(),
    };

    this.consoleEvent.emit(initEvent);
  }
}
