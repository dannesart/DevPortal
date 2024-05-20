import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  catchError,
  throwError,
  Subscription,
  BehaviorSubject,
  filter,
  Observable,
  of,
} from 'rxjs';
import { ApiEndpoints, ApiHost } from '../constants/api';
import { PortalService } from './portal.service';

interface PeyyaWindow extends Window {
  Intercom: any;
}

declare var window: PeyyaWindow;

interface DeveloperResponse {
  developer: any;
  message: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class DeveloperService implements OnDestroy {
  private developerSub$: Subscription | undefined;
  private developerBehavior$: BehaviorSubject<any> | undefined = new BehaviorSubject(undefined);

  public createDeveloper = async (name: string = 'Test namn') => {
    try {
      await this.http
        .post(`${ApiHost}${ApiEndpoints.developer}`, { name })
        .subscribe((response) => {
          return response;
        });
    } catch (error) {
      throw error;
    }
  };

  public handleError = (error: HttpErrorResponse) => {
    return throwError(() => {
      this.portal.updateApiStatus(false);
      throw new Error('Developer couldn´t be fetched');
    });
  };

  private timeout: any;
  public updateDeveloper = async (object: { [key: string]: string }) => {
    const current = this.developerBehavior$?.value;
    this.developerBehavior$?.next({ ...current, ...object });

    if(this.timeout){
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.developerSub$ = this.http
          .patch(`${ApiHost}${ApiEndpoints.developer}`, this.developerBehavior$?.value)
          .pipe(catchError(this.handleError))
          .subscribe((response) => {
            this.portal.updateApiStatus(true);
            this.developerSub$?.unsubscribe();
          })

    }, 5000);
  }

  public developer$ = () => {
    return this.developerBehavior$?.asObservable();
  }

  public getDeveloper = async () => {
    if (!this.developerSub$) {
      try {
        this.developerSub$ = this.http
          .get(`${ApiHost}${ApiEndpoints.developer}`)
          .pipe(catchError(this.handleError))
          .subscribe((response) => {
            this.portal.updateApiStatus(true);
            const developer = (response as DeveloperResponse).developer;
            this.developerBehavior$?.next(developer);

            this.developerSub$?.unsubscribe();

            if (window) {
              window.Intercom('boot', {
                api_base: 'https://api-iam.intercom.io',
                app_id: 'ohflijrp',
                name: developer.name, // Full name
                email: developer.email, // Email address
                created_at: '1312182000', // Signup date as a Unix timestamp
              });
            }
          });
      } catch (error) {
        debugger;
        throw error;
      }
    }
  };

  ngOnDestroy() {
    if (this.developerSub$) {
      this.developerSub$.unsubscribe();
    }
  }

  constructor(
    public http: HttpClient,
    public router: Router,
    public portal: PortalService
  ) {
    if (window) {
      router.events
        .pipe(filter((event) => event instanceof NavigationStart))
        .subscribe(() => {
          window.Intercom('update');
        });
    }
  }
}
