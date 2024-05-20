import { InputType } from 'src/app/models/ui.input';
import { DemoService } from 'src/app/services/demo.service';
import { ApplicationService } from 'src/app/services/applications.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEmulator } from 'src/app/models/emulator';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConsoleEventTypes, IConsoleEvent } from 'src/app/models/console';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public authPhone: string | null = null;
  public authCode: string | null = null;
  public phoneError = '';
  public codeError = '';
  public waiting = false;
  public showRestart = false;
  public authorizeStarted = false;
  public inputType = InputType;
  public error$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  @Input() config: IEmulator | undefined;
  @Output('consoleEvent') consoleEvent: EventEmitter<IConsoleEvent> =
    new EventEmitter<IConsoleEvent>();

  constructor(
    public http: HttpClient,
    public appService: ApplicationService,
    public demo: DemoService
  ) {
    // Load state from save.
    demo.loadStateProp('token');
    demo.loadStateProp('token_expires');
    if (!demo.getStateProp('token_expires')) {
      demo.deleteStateProp('token');
      demo.updateState({ token: null });
    }
  }

  /**
   * Check if user in demo is authorized.
   *
   */
  public get isAuth() {
    const expire = this.demo.getStateProp('token_expires');
    if (!expire) return false;
    return this.demo.getStateProp('token');
  }

  /**
   * Inputs configs and events.
   * Each input will have a config and events.
   */
  public inputs = {
    phone: {
      config: {
        id: 'phone_number',
        type: this.inputType.phone,
        name: 'phone_number',
        placeholder: 'Phone number',
        initValue: this.authPhone,
        label: 'Phone number',
      },
      valueChange: ($event: string) => this.handleInputChange($event, 'phone'),
      valueInvalid: ($event: string) => this.handleInputError($event, 'phone'),
    },
    authRember: {
      config: {
        id: 'auth_remember',
        type: this.inputType.checkbox,
        name: 'auth_remember',
        placeholder: 'Remember me',
        initValue: false,
        label: 'Remember me',
      },
      valueChange: ($event: string) => {
        this.demo.updateState({ auth_remember: !!$event });
      },
    },
    code: {
      config: {
        id: 'phone_number',
        type: this.inputType.numberValidation,
        name: 'phone_number',
        placeholder: '0',
        initValue: this.authPhone,
        label: 'Code',
      },
      valueChange: ($event: string) =>
        this.handleInputChange($event, 'numberValidation'),
      valueInvalid: ($event: string) =>
        this.handleInputError($event, 'numberValidation'),
    },
  };

  private handleAuthError = (error: HttpErrorResponse) => {
    return throwError(() => {
      this.showRestart = true;
      const authFailed: IConsoleEvent = {
        message: 'Auth failed',
        type: ConsoleEventTypes.error,
        id: uuidv4(),
        data: error,
      };
      this.waiting = false;
      this.consoleEvent.emit(authFailed);
      this.error$.next('Could not authorize: ' + error.error.error);
    });
  };

  public authorizing = () => {
    const endpoint = this.config?.config?.ApiEndpoints?.['auth'];
    const host = this.config?.config?.ApiHost;
    const full = `${host}${endpoint}`;
    this.waiting = true;
    this.error$.next(null);
    const authorizingEvent: IConsoleEvent = {
      message: 'Authorizing ...',
      type: ConsoleEventTypes.apiCall,
      id: uuidv4(),
      data: {
        url: full,
        phoneNumber: this.authPhone,
      },
    };

    this.consoleEvent.emit(authorizingEvent);
    const app = this.appService.applicationBehavior$.value;
    const { client_id, client_secret } = app;
    this.http
      .post(
        full,
        {
          phoneNumber: this.authPhone,
        },
        {
          headers: {
            clientid: client_id,
            clientsecret: client_secret
          },
        }
      )
      .pipe(catchError(this.handleAuthError))
      .subscribe((data: any) => {
        this.authorizeStarted = true;
        this.waiting = false;
        const authorizingDone: IConsoleEvent = {
          message: 'Authorizing started. Waiting for code',
          type: ConsoleEventTypes.success,
          id: uuidv4(),
          data,
        };
        this.consoleEvent.emit(authorizingDone);
      });
  };

  private validateAuthorizing = () => {
    const endpoint = this.config?.config?.ApiEndpoints?.['authValidate'];
    const host = this.config?.config?.ApiHost;
    const full = `${host}${endpoint}`;

    this.waiting = true;
    this.error$.next(null);
    const authorizingEvent: IConsoleEvent = {
      message: 'Validating code ...',
      type: ConsoleEventTypes.apiCall,
      id: uuidv4(),
      data: {
        url: full,
        phoneNumber: this.authPhone,
        otp: this.authCode,
      },
    };

    this.consoleEvent.emit(authorizingEvent);
    const app = this.appService.applicationBehavior$.value;
    const { client_id, client_secret } = app;
    this.http
      .post(
        full,
        {
          phoneNumber: this.authPhone,
          otp: this.authCode,
        },
        {
          headers: {
            clientid: client_id,
            clientsecret: client_secret
          },
        }
      )
      .pipe(catchError(this.handleAuthError))
      .subscribe((data: any) => {
        this.authorizeStarted = false;
        this.showRestart = true;
        this.waiting = false;
        const authorizingDone: IConsoleEvent = {
          message: 'Authorizing completed',
          type: ConsoleEventTypes.success,
          id: uuidv4(),
          data,
        };
        this.consoleEvent.emit(authorizingDone);
        this.demo.updateState({
          token: data?.access_token,
          token_type: data?.token_type,
          token_expires: data?.expires_in,
        });

        if (this.demo.getStateProp('auth_remember')) {
          this.demo.saveStateProp('token', data?.access_token);
          this.demo.saveStateProp('token_expires', data?.expires_in);
        }
      });
  };

  public restart = ($event: Event) => {
    $event.preventDefault();
    this.demo.deleteStateProp('token');
    this.demo.deleteStateProp('token_expires');
    this.demo.updateState({ token: null, token_expires: null });
    this.authorizeStarted = false;
    this.showRestart = false;
    this.error$.next(null);
    const restart: IConsoleEvent = {
      message: 'Restarting',
      type: ConsoleEventTypes.restart,
      id: uuidv4(),
    };

    this.consoleEvent.emit(restart);
  };

  public handleClick = ($event: Event) => {
    $event.preventDefault();
    this.phoneError = '';
    if (this.authorizeStarted) {
      if (this.authCode) {
        this.validateAuthorizing();
      }
    } else {
      if (this.authPhone) {
        this.authorizing();
      } else {
        this.phoneError = 'Missing phone number';
      }
    }
  };
  public handleInputError = (error: string, key: string) => {
    switch (key) {
      case 'phone':
        this.phoneError = error;
        break;
      case 'code':
        this.codeError = error;
        break;
    }
  };
  public handleInputChange = (value: string, key: string) => {
    switch (key) {
      case 'phone':
        this.authPhone = value;
        break;
      case 'code':
        this.authCode = value;
        break;
      case 'numberValidation':
        this.authCode = value;
        break;
    }
  };

  ngOnInit() {
    const initEvent: IConsoleEvent = {
      message: 'Auth demo just started',
      type: ConsoleEventTypes.init,
      id: uuidv4(),
    };

    this.consoleEvent.emit(initEvent);
  }
}
