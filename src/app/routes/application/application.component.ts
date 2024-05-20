import { ISection } from 'src/app/models/sections';
import { IApplication, IApplicationResponse } from 'src/app/models/application';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplicationSections } from 'src/app/constants/sections';
import { ApplicationService } from 'src/app/services/applications.service';
import { GuideMock } from 'src/app/mocks/guide';
import { IGuide } from 'src/app/models/guide';
import { ApiEndpoints, ApiHost } from 'src/app/constants/api';

import { Location } from '@angular/common';

@Component({
  selector: 'route-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit, OnDestroy {
  public application: IApplication | null = null;
  public applicationSub$: Subscription | undefined;
  public routeSub: Subscription;
  public sections: ISection[] = [...ApplicationSections];
  public activeSection = 0;
  public showSecret = false;
  public guide: IGuide = { segments: [] };
  public showConfirmProduct = false;
  public showConfirmRemoval = false;
  public applicationId = '';

  public toggleSecret = (e: Event) => {
    e.preventDefault();
    this.showSecret = !this.showSecret;
  };

  public cancelToggle = () => {
    this.showConfirmProduct = false;
  };

  public toggleSandbox = () => {
    if (this.application) {
      if (this.application.sandbox) {
        this.showConfirmProduct = true;
      } else {
        this.toggleMode();
      }
    }
  };

  public confirmProductionMode = (e: Event) => {
    e.preventDefault();
    if (this.application) {
      this.toggleMode();
    }
  };

  private toggleMode = () => {
    if (this.application) {
      this.application.sandbox = !this.application.sandbox;
      this.applicationService.updateApplication(
        this.application.id,
        this.application
      );
      this.cancelToggle();
    }
  };

  public getApplication = (applicationId: string) => {
    this.applicationSub$ = this.applicationService
      .getApplication(applicationId)
      .subscribe((response) => {
        this.application = (response as IApplicationResponse)
          .applications as IApplication;
        this.guide = GuideMock({
          clientsecret: `${this.application?.client_secret}`,
          clientid: `${this.application?.client_id}`,
          name: `${this.application.name}`,
          use_credentials: this.application.use_credentials,
          ApiHost,
          ApiEndpoints,
        });
        this.applicationService.applicationBehavior$.next(this.application);
        this.applicationSub$?.unsubscribe();
      });
  };

  public codeSnippet = '';

  public setActive = (idx: number) => {
    this.activeSection = idx;
    this.location.go(
      `applications/${this.applicationId}/${this.sections[idx].name}`
    );
  };

  constructor(
    public activeRoute: ActivatedRoute,
    public router: Router,
    public applicationService: ApplicationService,
    public location: Location
  ) {
    this.routeSub = this.activeRoute.params.subscribe((params) => {
      const { applicationId, section } = params;
      this.applicationId = applicationId;
      if (section) {
        const idx = this.sections.findIndex((s: ISection) => s.name == section);
        if (idx > -1) {
          this.activeSection = idx;
        }
      }
      this.getApplication(applicationId);
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.routeSub.unsubscribe();
    this.applicationSub$?.unsubscribe();
  }
}
