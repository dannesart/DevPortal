import { InputType } from 'src/app/models/ui.input';
import { IApplication } from 'src/app/models/application';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/applications.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'route-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  public inputType = InputType;
  public newApplication: { name: string } = { name: '' };

  public goToApplication = (application: IApplication) => {
    this.router.navigate(['applications', application.id]);
  };

  public createNewApplication = () => {
    this.applicationService.isCreatingNewApplication$.next(true);
    this.newApplication = {
      name: '',
    };
  };

  public cancelNewApplication = () => {
    this.applicationService.isCreatingNewApplication$.next(false);
  };

  public createApplication = () => {
    this.applicationService.createNewApplication(this.newApplication.name);
    // Handle creation here.
    this.cancelNewApplication();
  };

  public handleInputChange = (value: string, key: string) => {
    switch (key) {
      case 'applicationName':
        this.newApplication.name = value;
        break;
    }
  };

  constructor(
    public router: Router,
    public applicationService: ApplicationService
  ) {}

  ngOnInit() {}
}
