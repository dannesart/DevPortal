import { InputType } from 'src/app/models/ui.input';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEmulator } from 'src/app/models/emulator';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConsoleEventTypes, IConsoleEvent } from 'src/app/models/console';
import { catchError, throwError, Subscription, BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { DemoRequestMethods, DemoService } from 'src/app/services/demo.service';
import { ApiEndpoints, ApiHost } from 'src/app/constants/api';

interface BanksResult {
  status: string;
  banks: any[];
}

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
})
export class BanksComponent implements OnInit {
  public waiting = false;
  public authorized = false;
  public banks$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public authOptions$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public error$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public showRestart = false;
  public inputType = InputType;
  public currentCountry = 'SE';
  public countries$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  @Input() config: IEmulator | undefined;
  @Output('consoleEvent') consoleEvent: EventEmitter<IConsoleEvent> =
    new EventEmitter<IConsoleEvent>();

  constructor(public http: HttpClient, public demoService: DemoService) {}

  public handleGettingBanksError = (error: HttpErrorResponse) => {
    return throwError(() => {
      this.showRestart = true;
      this.waiting = false;
      this.banks$.next(null);
      const gettingBanksDone: IConsoleEvent = {
        message: 'Banks fetched failed',
        type: ConsoleEventTypes.error,
        id: uuidv4(),
        data: error,
      };
      this.consoleEvent.emit(gettingBanksDone);
      this.error$.next('Could not get banks');
    });
  };

  public updateCountry = (value: any) => {
    this.currentCountry = value.key || value;
    this.getBanks();
  };

  public getBanks = () => {
    this.waiting = true;
    this.error$.next(null);
    const gettingBanksEvent: IConsoleEvent = {
      message: 'Getting banks ...',
      type: ConsoleEventTypes.apiCall,
      id: uuidv4(),
    };

    this.consoleEvent.emit(gettingBanksEvent);

    this.demoService
      .request({
        method: DemoRequestMethods.GET,
        endpoint: `${ApiHost}${ApiEndpoints.banks}?isoCountry=${this.currentCountry}`,
        headers: {
          Authorization:
            `Bearer ${this.demoService.getStateProp('token')}` || '',
        },
      })
      .pipe(catchError(this.handleGettingBanksError))
      .subscribe((data) => {
        const banksResult = data as BanksResult;
        this.waiting = false;
        this.banks$.next(banksResult.banks);
        this.demoService.updateState({ banks: banksResult.banks });
        const gettingBanksDone: IConsoleEvent = {
          message: 'Banks fetched complete',
          type: ConsoleEventTypes.success,
          id: uuidv4(),
          data,
        };
        this.consoleEvent.emit(gettingBanksDone);
      });
  };

  public handleInitConsentError = (error: HttpErrorResponse) => {
    return throwError(() => {
      this.showRestart = true;
      this.waiting = false;
      const initConsentDone: IConsoleEvent = {
        message: 'Could not start a consent',
        type: ConsoleEventTypes.error,
        id: uuidv4(),
        data: error,
      };
      this.consoleEvent.emit(initConsentDone);
      this.error$.next('Could not start a consent');
    });
  };

  public initConsent = (bicFi: string) => {
    this.banks$.next(null);

    this.waiting = true;
    const initConsentEvent: IConsoleEvent = {
      message: 'Starting consent ...',
      type: ConsoleEventTypes.apiCall,
      id: uuidv4(),
    };

    this.consoleEvent.emit(initConsentEvent);

    this.demoService
      .request({
        method: DemoRequestMethods.POST,
        endpoint: `${ApiHost}${ApiEndpoints.banks}/consent/init`,
        data: {
          bicFi,
        },
        headers: {
          Authorization:
            `Bearer ${this.demoService.getStateProp('token')}` || '',
        },
      })
      .pipe(catchError(this.handleInitConsentError))
      .subscribe((data) => {
        const authOptionsResult = data as any;
        this.waiting = false;
        this.authOptions$.next(authOptionsResult);
        const gettingAuthOptionsDone: IConsoleEvent = {
          message: 'Auth options fetched complete',
          type: ConsoleEventTypes.success,
          id: uuidv4(),
          data,
        };
        this.consoleEvent.emit(gettingAuthOptionsDone);
      });
  };

  public handleInitAuthConsentError = (error: HttpErrorResponse) => {
    this.showRestart = true;
    return throwError(() => {
      const authConsentError: IConsoleEvent = {
        message: 'Could not start authorization method',
        type: ConsoleEventTypes.error,
        id: uuidv4(),
        data: error,
      };
      this.consoleEvent.emit(authConsentError);
    });
  };

  public initAuthConsent = (data: {
    authenticationType: string;
    authenticationMethodId: string;
    name: string;
  }) => {
    this.waiting = true;
    const { consent } = this.authOptions$.value;
    const { authorisationId, consentId, bicFi } = consent;
    const initConsentEvent: IConsoleEvent = {
      message: `Starting ${data.name} ...`,
      type: ConsoleEventTypes.apiCall,
      id: uuidv4(),
    };

    this.authOptions$.next(null);
    this.consoleEvent.emit(initConsentEvent);

    this.demoService
      .request({
        method: DemoRequestMethods.POST,
        endpoint: `${ApiHost}${ApiEndpoints.banks}/consent/auth`,
        data: {
          authMethodId: data.authenticationMethodId,
          consentAuthId: authorisationId,
          consentId,
          bicFi,
        },
        headers: {
          Authorization:
            `Bearer ${this.demoService.getStateProp('token')}` || '',
        },
      })
      .pipe(catchError(this.handleInitConsentError))
      .subscribe((data) => {
        //const authOptionsResult = data as any;
        //this.waiting = false;
        //this.authOptions$.next(authOptionsResult);
        this.getStatus(authorisationId, consentId, bicFi);
        // const gettingAuthOptionsDone: IConsoleEvent = {
        //   message: 'Auth options fetched complete',
        //   type: ConsoleEventTypes.success,
        //   id: uuidv4(),
        //   data,
        // };
        // this.consoleEvent.emit(gettingAuthOptionsDone);
      });
  };
  public statusTries = 0;
  public getStatus = async (
    authorisationId: string,
    consentId: string,
    bicFi: string
  ) => {
    const waitingAuthStatusDone: IConsoleEvent = {
      message: 'Waiting for auth to be completed',
      type: ConsoleEventTypes.success,
      id: uuidv4(),
    };
    this.consoleEvent.emit(waitingAuthStatusDone);
    this.authOptions$.next(null);
    this.waiting = true;
    this.statusTries++;
    this.demoService
      .request({
        method: DemoRequestMethods.GET,
        endpoint: `${ApiHost}${ApiEndpoints.banks}/consent/status`,
        headers: {
          Authorization:
            `Bearer ${this.demoService.getStateProp('token')}` || '',

          consentAuthId: authorisationId,
          consentId,
          bicFi,
        },
      })
      .pipe(catchError(this.handleInitConsentError))
      .subscribe((data) => {
        const { consent } = data as any;
        if (consent.scaStatus === 'started') {
          if (this.statusTries >= 10) {
            this.showRestart = true;
            this.waiting = false;
            this.consoleEvent.emit({
              message: 'Could not authorize consent',
              type: ConsoleEventTypes.error,
              id: uuidv4(),
              data: {
                error: 'Not responding. Please try again',
              },
            });
            this.showRestart = true;
            this.error$.next('Could not authorize consent');
            debugger;
          } else {
            setTimeout(() => {
              this.getStatus(authorisationId, consentId, bicFi);
            }, 3000);
          }
        } else {
          debugger;
          this.waiting = false;
        }
      });
  };

  public getCountries = () => {
    this.waiting = true;
    const gettingCountriesEvent: IConsoleEvent = {
      message: 'Getting countries ...',
      type: ConsoleEventTypes.apiCall,
      id: uuidv4(),
    };

    this.consoleEvent.emit(gettingCountriesEvent);

    this.demoService
      .request({
        method: DemoRequestMethods.GET,
        endpoint: `${ApiHost}${ApiEndpoints.banks}/countries`,
        headers: {
          Authorization:
            `Bearer ${this.demoService.getStateProp('token')}` || '',
        },
      })
      .pipe(catchError(this.handleGettingBanksError))
      .subscribe((data: any) => {
        this.waiting = false;
        this.demoService.updateState({ countries: data.countries });

        const countriesKeyValue = data.countries.map(
          (country: { name: string; isoCountryCode: string }) => {
            return {
              key: country.name,
              value: country.isoCountryCode,
            };
          }
        );
        this.countries$.next(countriesKeyValue);

        const gettingCountriesDone: IConsoleEvent = {
          message: 'Countries fetched complete',
          type: ConsoleEventTypes.success,
          id: uuidv4(),
          data,
        };
        this.consoleEvent.emit(gettingCountriesDone);
      });
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
    this.error$.next(null);
    this.consoleEvent.emit(restart);

    if (!this.demoService.getStateProp('token')) {
      this.error$.next('You need to be authenticated first. Then try again.');
      this.showRestart = true;
      return;
    }

    this.getCountries();
    this.getBanks();
  };

  async ngOnInit() {
    const initEvent: IConsoleEvent = {
      message: 'Auth demo just started',
      type: ConsoleEventTypes.init,
      id: uuidv4(),
    };

    this.consoleEvent.emit(initEvent);

    if (!this.demoService.getStateProp('token')) {
      this.error$.next('You need to be authenticated first. Then try again.');
      this.showRestart = true;
      return;
    }

    this.getCountries();
    this.getBanks();
  }
}
