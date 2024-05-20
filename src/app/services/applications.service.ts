import { PortalService } from './portal.service';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Subscription,
  throwError,
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiEndpoints, ApiHost } from '../constants/api';
import { IApplication } from '../models/application';

interface ApplicationResponse {
  applications: any;
  message: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private applicationsSub$: Subscription | undefined;
  public applicationsBehavior$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public applicationBehavior$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public isGettingApplications$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public gettingApplicationsError$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isGettingApplication$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public gettingApplicationError$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public visibleSection$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public isDeletingApplication$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isUpdatingApplication$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isCreatingNewApplication$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isPostingNewApplication$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public getApplications = () => {
    this.isGettingApplications$.next(true);
    this.gettingApplicationsError$.next(false);
    this.applicationsSub$ = this.http
      .get(`${ApiHost}${ApiEndpoints.application}`)
      .pipe(catchError(this.handleError))
      .subscribe((response) => {
        this.applicationsBehavior$?.next(
          (response as ApplicationResponse).applications
        );
        this.portal.updateApiStatus(true);
        this.isGettingApplications$.next(false);
        this.applicationsSub$?.unsubscribe();
      });
  };

  public updateApplication = (applicationId: string, data: IApplication) => {
    if (!this.applicationsSub$ || this.applicationsSub$.closed) {
      this.isUpdatingApplication$.next(true);
      this.applicationsSub$ = this.http
        .patch(
          `${ApiHost}${ApiEndpoints.application}?applicationId=${applicationId}`,
          data
        )
        .pipe(catchError(this.handleError))
        .subscribe((response) => {
          this.applicationsBehavior$?.next(response);
          this.isUpdatingApplication$.next(false);
          this.applicationsSub$?.unsubscribe();
        });
    }
  };

  public getApplication = (applicationId: string) => {
    this.isGettingApplication$.next(true);
    this.gettingApplicationError$.next(false);
    return this.http
      .get(
        `${ApiHost}${ApiEndpoints.application}?applicationId=${applicationId}`
      )
      .pipe(
        catchError(this.handleGetApplicationError),
        map((response) => {
          this.isGettingApplication$.next(false);
          this.portal.updateApiStatus(true);
          return response;
        })
      );
  };

  public deleteApplication = (applicationId: string) => {
    this.isDeletingApplication$.next(true);
    return this.http
      .delete(`${ApiHost}${ApiEndpoints.application}/${applicationId}`)
      .pipe(
        map((response) => {
          this.isDeletingApplication$.next(false);
          return response;
        })
      );
  };

  public handleError = (error: HttpErrorResponse) => {
    return throwError(() => {
      console.error(error);
      this.isPostingNewApplication$.next(false);
      this.isGettingApplications$.next(false);
      this.gettingApplicationsError$.next(true);
      this.applicationsSub$?.unsubscribe();
      this.portal.updateApiStatus(false);
      throw new Error('Applications couldn´t be fetched');
    });
  };

  public handleGetApplicationError = (error: HttpErrorResponse) => {
    return throwError(() => {
      this.gettingApplicationError$.next(true);
      this.isGettingApplication$.next(false);
      this.portal.updateApiStatus(false);
      throw new Error('Applications couldn´t be fetched');
    });
  };

  public createNewApplication = (appName: string) => {
    if (!this.applicationsSub$ || this.applicationsSub$.closed) {
      this.isPostingNewApplication$.next(true);
      this.applicationsSub$ = this.http
        .post(`${ApiHost}${ApiEndpoints.application}`, { name: appName })
        .pipe(catchError(this.handleError))
        .subscribe((response) => {
          this.isPostingNewApplication$.next(false);
          this.applicationsSub$?.unsubscribe();
          this.getApplications();
        });
    }
  };

  constructor(public http: HttpClient, public portal: PortalService) {}
}
